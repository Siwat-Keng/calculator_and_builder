from flask import Flask, request, make_response
from flask_cors import CORS
from math import exp

app = Flask(__name__)
CORS(app)

def valid_calculate(form):
    result = {}
    try:
        result['base_atk'] = float(form['base_atk'])
        result['atk_percent'] = float(form['atk_percent'])
        result['flat_atk'] = float(form['flat_atk'])
        result['bonus_dmg'] = float(form['bonus_dmg'])
        result['total_dmg_multi'] = float(form['total_dmg_multi'])
        result['talent_dmg'] = float(form['talent_dmg'])
        result['cri_rate'] = float(form['cri_rate'])
        result['cri_dmg'] = float(form['cri_dmg'])
        result['enemy_lvl'] = float(form['enemy_lvl'])
        for value in result.values():
            if value < 0:
                raise Exception
        result['character_lvl'] = float(form['character_lvl'])
        if result['character_lvl'] < 0 or result['character_lvl'] > 90:
            raise Exception
        result['decrease_def'] = float(form['decrease_def'])
        result['enemy_resist'] = float(form['enemy_resist'])
        if result['cri_rate'] > 100:
            result['cri_rate'] = 100
        if result['decrease_def'] > 100:
            result['decrease_def'] = 100
        if result['enemy_resist'] > 100:
            result['enemy_resist'] = 100
        return result
    except:
        return False

def valid_scale_reaction(form):
    result = {}
    try:
        if form['type'] not in {'melt', 'vaporize'} or form['trigger'] not in {'pyro', 'cyro', 'hydro'}:
            raise Exception
        result['type'] = form['type']
        result['trigger'] = form['trigger']
        result['damage'] = float(form['damage'])
        result['em'] = float(form['em'])
        result['increase'] = float(form['increase'])
        if result['damage'] < 0 or result['em'] < 0 or result['increase'] < 0:
            raise Exception
        return result
    except:
        return False

def valid_non_scale_reaction(form):
    result = {}
    try:
        if form['type'] not in {'crystallize','overload','superconduct',
        'electro_charged','shattered','swirl'}:
            raise Exception
        result['type'] = form['type']
        result['lvl'] = float(form['lvl'])
        result['em'] = float(form['em'])
        result['increase'] = float(form['increase'])
        if result['lvl'] < 0 or result['lvl'] > 90 or result['lvl'] % 1 != 0:
            raise Exception
        if result['em'] < 0 or result['increase'] < 0:
            raise Exception
        return result
    except:
        return False

def calculate_avg(data):
    atk = data['base_atk']*(1+data['atk_percent']/100)+data['flat_atk']
    dmg_non_cri_before_lv = atk*(1+data['bonus_dmg']/100)*data['talent_dmg']*(1+data['total_dmg_multi']/100)/100
    non_cri_dmg = (100+data['character_lvl'])*dmg_non_cri_before_lv*(1-data['enemy_resist']/100)/\
        (100+data['character_lvl']+(100+data['enemy_lvl'])*(1-data['decrease_def']/100))
    cri_dmg = non_cri_dmg*(1+data['cri_dmg']/100)
    cri_ratio = data['cri_rate']/100
    return cri_dmg*cri_ratio+non_cri_dmg*(1-cri_ratio)

def analyst_dmg(data):
    RATIO = {
        'flat_atk': 14,
        'atk_percent': 4.1,
        'cri_rate': 2.7,
        'cri_dmg': 5.4,
    }
    temp = [data.copy() for i in range(len(RATIO))]
    for i, k in enumerate(RATIO):
        if k == 'cri_rate' and temp[i][k] + RATIO[k] > 100:
            temp[i][k] = 100
        else:
            temp[i][k] += RATIO[k]
        temp[i] = (calculate_avg(temp[i]), k)
    return max(temp)[1]

def get_base_shield_health(lvl):
    DATA = [91, 159, 304, 438, 558, 716, 896, 1095, 1277, 1421]
    index = int(lvl//10)
    point = int(lvl%10)
    if index == 0:
        return point*68/9+751/9
    elif point == 0:
        return DATA[index]
    else:
        return ((DATA[index+1]-DATA[index])/DATA[index])*point+DATA[index]

def get_shield_health_bonus(em):
    return 40/9*em/(1401+em)

def calculate_overload(lvl, em, inc):
    return (1+(0.453633528*em*exp(-0.000505*em)+inc)/100)*(-0.0000027646*(lvl**5)+0.0005189440*(lvl**4)\
        -0.0314790536*(lvl**3)+0.9268181504*(lvl**2)-4.3991155718*lvl+37.4371542286)

def calculate_superconduct(lvl, em, inc):
    return (1+(0.453633528*em*exp(-0.000505*em)+inc)/100)*(-0.0000006038*lvl**5+0.0001110078*lvl**4-\
        0.0064237710*lvl**3+0.1836799174*lvl**2-0.4750909512*lvl+7.4972486411)

def calculate_electro_charged(lvl, em, inc):
    return (1+(0.453633528*em*exp(-0.000505*em)+inc)/100)*(-0.0000014798*lvl**5+0.0002746679*lvl**4\
        -0.0162160738*lvl**3+0.4742385201*lvl**2-1.6987232790*lvl+20.8340255487)

def calculate_shattered(lvl, em, inc):
    return (1+(0.453633528*em*exp(-0.000505*em)+inc)/100)*(-0.0000020555*lvl**5+0.0003895953*lvl**4\
        -0.0239673351*lvl**3+0.7174530144*lvl**2-3.7397755267*lvl+31.2160750111)

def calculate_swirl(lvl, em, inc):
    return (1+(0.453633528*em*exp(-0.000505*em)+inc)/100)*(-0.0000008854*lvl**5+0.0001679502*lvl**4\
        -0.0103922088*lvl**3+0.3097567417*lvl**2-1.7733381829*lvl+13.5157684329)

@app.route('/', methods=['GET'])
def home():
    return make_response('OK', 200)

@app.route('/calculate/avg_dmg', methods=['POST'])
def calculate():
    valid_param = valid_calculate(request.json)
    if valid_param:
        result = {'status': 'OK', 'result':{}}
        atk = valid_param['base_atk']*(1+valid_param['atk_percent']/100)+valid_param['flat_atk']
        dmg_non_cri_before_lv = atk*(1+valid_param['bonus_dmg']/100)*valid_param['talent_dmg']*(1+valid_param['total_dmg_multi']/100)/100
        result['result']['non_cri_dmg'] = (100+valid_param['character_lvl'])*dmg_non_cri_before_lv*(1-valid_param['enemy_resist']/100)/\
            (100+valid_param['character_lvl']+(100+valid_param['enemy_lvl'])*(1-valid_param['decrease_def']/100))
        result['result']['cri_dmg'] = result['result']['non_cri_dmg']*(1+valid_param['cri_dmg']/100)
        result['result']['analyst'] = analyst_dmg(valid_param)
        result['result']['avg_dmg'] = (valid_param['cri_dmg']*valid_param['cri_rate']/10000+1)*result['result']['non_cri_dmg']
    else:
        result = {'status': 'invalid input', 'result': None}
    return make_response(result, 200)

@app.route('/calculate/scale_reaction_dmg', methods=['POST'])
def scale_reaction_dmg():
    valid_param = valid_scale_reaction(request.json)
    if valid_param:
        result = {'status': 'OK'}
        if (valid_param['trigger'] == 'pyro' and valid_param['type'] == 'melt') or\
            (valid_param['trigger'] == 'hydro' and valid_param['type'] == 'vaporize'):
            result['damage'] = valid_param['damage']*2*(1+(0.189266831\
                *valid_param['em']*exp(-0.000505*valid_param['em']))/100+valid_param['increase']/100)
        elif (valid_param['trigger'] == 'cyro' and valid_param['type'] == 'melt') or\
            (valid_param['trigger'] == 'pyro' and valid_param['type'] == 'vaporize'):
            result['damage'] = valid_param['damage']*1.5*(1+(0.189266831\
                *valid_param['em']*exp(-0.000505*valid_param['em']))/100+valid_param['increase']/100)
        else:
            result = {'status': 'invalid input', 'damage': None}
    else:
        result = {'status': 'invalid input', 'damage': None}
    return make_response(result, 200)

@app.route('/calculate/reaction_dmg', methods=['POST'])
def calculate_non_scale_reaction():
    valid_param = valid_non_scale_reaction(request.json)
    if valid_param:
        result = {'status': 'OK'}
        if valid_param['type'] == 'overload':
            result['result'] = calculate_overload(valid_param['lvl'], valid_param['em'], valid_param['increase'])
        elif valid_param['type'] == 'superconduct':
            result['result'] = calculate_superconduct(valid_param['lvl'], valid_param['em'], valid_param['increase'])
        elif valid_param['type'] == 'electro_charged':
            result['result'] = calculate_electro_charged(valid_param['lvl'], valid_param['em'], valid_param['increase'])
        elif valid_param['type'] == 'shattered':
            result['result'] = calculate_shattered(valid_param['lvl'], valid_param['em'], valid_param['increase'])
        elif valid_param['type'] == 'swirl':
            result['result'] = calculate_swirl(valid_param['lvl'], valid_param['em'], valid_param['increase'])
        elif valid_param['type'] == 'crystallize':
            result['result'] = get_base_shield_health(valid_param['lvl'])*\
            (1+get_shield_health_bonus(valid_param['em'])+valid_param['increase']/100)
        else:
            result = {'status': 'invalid input', 'result': None}
    else:
        result = {'status': 'invalid input', 'result': None}
    return make_response(result, 200)
