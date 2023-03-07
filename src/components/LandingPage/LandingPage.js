/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { Component, useState, useEffect } from 'react';

import './LandingPage.css';

import menu from '../../assets/menu.svg';
import x from '../../assets/x.svg';
import bg from '../../assets/bg.svg';
import arr_down from '../../assets/arr-down.svg';

import bg_flag from '../../assets/bg flag.svg';
import uk_flag from '../../assets/uk flag.svg';

import { Redirect } from 'react-router-dom';

const LandingPage = () => {

    const [lang, setLang] = useState('en');

    useEffect(() => {
        localStorage.getItem('lang') ? setLang(localStorage.getItem('lang')) : setLang('en');
    }, []);

    const handleLangClick = (lang) => {
        setLang(lang);
        localStorage.setItem('lang', lang);
    }

    const [page, setPage] = useState(0);

    const [gender, setGender] = useState(0);

    const [age, setAge] = useState(null);
    const [weight, setWeight] = useState([null, 'kg']);
    const [height, setHeight] = useState([null, 'cm']);
    const [bf, setBf] = useState(null);
    const [activity, setActivity] = useState('Sedentary');

    const [open, setOpen] = useState(null);

    const changeDouble = (type, val) => {
        if (type === 'weight') {
            setWeight([weight[0], val]);
        } else if (type === 'height') {
            setHeight([height[0], val]);
        }

        setOpen(null);
    }

    const handleChange = (e, type) => {
        if (type === 'weight') {
            setWeight([parseInt(e.target.value), weight[1]]);
        } else if (type === 'height') {
            setHeight([parseInt(e.target.value), height[1]]);
        } else if (type === 'age') {
            setAge(parseInt(e.target.value));
        } else if (type === 'bf') {
            setBf(parseInt(e.target.value));
        }
    }

    const helper = {
        'Sedentary': 1.2,
        'Lightly Exercise': 1.375,
        'Moderate Exercise': 1.55,
        'Heavy Exercise': 1.725,
        'Athlete': 1.9
    }
    const helperBG = {
        'Sedentary': 'Никаква',
        'Light exercise': 'Лека активност',
        'Moderate exercise': 'Умерена активност',
        'Heavy exercise': 'Висока активност',
        'Athlete': 'Спортист'
    }

    const rmr = (gender === 0 ? 
                (10 * weight[0]) + (6.25 * height[0]) - (5 * age) + 5
                : (10 * weight[0]) + (6.25 * height[0]) - (5 * age) - 161)

    // const rmr = (10 * weight[0]) + (6.25 * height[0]) - (5 * age) + 5;
    const rmrU = Math.round(rmr * helper[activity])

    const gj = (gender === 0 ? 
                48 + 1.1 * (height[0] - 152)
                : 45.4 + 0.85 * (height[0] - 152))

    const bj = (gender === 0 ? 
                50 + 0.9 * (height[0] - 152)
                : 45.5 + 0.89 * (height[0] - 152))

    const jd = (gender === 0 ? 
                52 + 1.9 * ((height[0] / 2.54) - 60)
                : 49 + 1.7 * ((height[0] / 2.54) - 60))

    const dr = (gender === 0 ? 
                56.2 + 1.41 * ((height[0] / 2.54) - 60)
                : 56.2 + 1.13 * ((height[0] / 2.54) - 60))
    
    // const gj = 48 + 1.1 * (height[0] - 154);
    // const bj = 50 + 0.9 * (height[0] - 152);
    // const jd = 52 + 1.9 * ((height[0] / 2.54) - 60);
    // const dr = 56.2 + 1.41 * ((height[0] / 2.54) - 60);

    const bmi = (weight[0] / (height[0] / 100 * height[0] / 100)).toFixed(1);

    const m5 = height[0] - 100;
    const m10 = m5 + m5 * 0.05;
    const m15 = m5 + 2 * (m5 * 0.05);

    const macroHelper = [
        {
            title: 'Moderate Carb (30/35/35)',
            data: [30, 35, 35]
        },
        {
            title: 'Lower Carb (40/40/20)',
            data: [40, 40, 20]
        },
        {
            title: 'Higher Carb (30/20/50)',
            data: [30, 20, 50]
        }
        // 0: [30, 35, 35],
        // 1: [40, 40, 20],
        // 2: [30, 30, 50]
    ]
    const macroHelperBG = [
        {
            title: 'Умерени въглехидрати (30/35/35)',
            data: [30, 35, 35]
        },
        {
            title: 'Ниски въглехидрати (40/40/20)',
            data: [40, 40, 20]
        },
        {
            title: 'Високи въглехидрати (30/20/50)',
            data: [30, 20, 50]
        }
        // 0: [30, 35, 35],
        // 1: [40, 40, 20],
        // 2: [30, 30, 50]
    ]


    const [macro, setMacro] = useState(0);


    if (lang === 'en') {
        return (
            <div id='lp'>
                <img id='bg' src={ bg } />
    
                { page === 0 ? (
                    <div id='calc-btn' className={(age && weight[0] && height[0] ? 'ready ' : '')} onClick={() => setPage(1)}>
                        Calculate
                    </div>
                ) : (
                    <div id='calc-btn' className={'ready'} onClick={() => setPage(0)}>
                        Go back
                    </div>
                )}
    
    
                <div id='lpnav'>
                    <div id='lpnleft'>
                        <div className='sep'>
                            <div></div>
                        </div>
                        <label>Calorie calculator</label>
                    </div>
                    <div id='lpnright'>
                        <div className='flag-btn' onClick={() => handleLangClick('bg')}>
                            <img src={ bg_flag } />
                        </div>
                        <div className='flag-btn' onClick={() => handleLangClick('en')}>
                            <img src={ uk_flag } />
                        </div>
                        <div id='menubtn'>
                            <img src={ menu } />
                        </div>
                    </div>
                </div>
    
                <div id='lpcontent' className={page === 1 ? 'res ' : ''}>
                
                    {/* <div id='lphead'>
                        <h1>The website that can<br></br><span id='fspan'>connect</span> you with <span id='sspan'>anyone</span></h1>
                    </div> */}
                    { page === 0 ? (
                        <div id='lp-enter'>
                            <div className='option-cont'>
                                <h1 className='header' style={{marginBottom : '15px', marginLeft: '10px'}}>Gender</h1>
                                <div className={'radio-btn ' + (gender === 0 ? 'selected ' : '')} onClick={() => setGender(0)}>
                                    <div className='dot-cont'><div className='dot'><div></div></div></div>
                                    Male
                                </div>
                                <div className={'radio-btn ' + (gender === 1 ? 'selected ' : '')} onClick={() => setGender(1)}>
                                    <div className='dot-cont'><div className='dot'><div></div></div></div>
                                    Female
                                </div>
                            </div>
    
                            <div className='option-cont'>
                                <h1 className='header'>Weight</h1>
                                <div className='multi-input'>
                                    <input type='number' value={ weight[0] } className='input' onChange={(e) => handleChange(e, 'weight')} />
                                    <div className={'select ' + (open === 0 ? 'open ' : '')}>
                                        <label>{ weight[1] }</label>
                                        <div className='s-arr' onClick={() => setOpen((open !== 0 ? 0 : null))}>
                                            <img src={ arr_down } />
                                        </div>
    
                                        <div className={'s-menu '}>
                                            { weight[1] !== 'kg' && (
                                                <div className={'s-item '} onClick={() => changeDouble('weight', 'kg')}>
                                                    kg
                                                </div>
                                            )}
                                            { weight[1] !== 'lbs' && (
                                                <div className={'s-item ' + (weight[1] === 'lbs' ? 'hidden ' : '')} onClick={() => changeDouble('weight', 'lbs')}>
                                                    lbs
                                                </div>
                                            )}
                                        </div>
    
                                    </div>
                                    {/* <input className='input' /> */}
                                </div>
                            </div>
    
                            <div className='option-cont'>
                                <h1 className='header'>Activity</h1>
                                    {/* <div className='select main'>
                                        <label>Sedentary</label>
                                        <div className='s-arr'>
                                            <img src={ arr_down } />
                                        </div>
                                    </div> */}
                                    <div className={'select main ' + (open === 1 ? 'open ' : '')}>
                                        <label>{ activity }</label>
                                        <div className='s-arr' onClick={() => setOpen((open !== 1 ? 1 : null))}>
                                            <img src={ arr_down } />
                                        </div>
    
                                        <div className={'s-menu '}>
                                            { activity !== 'Sedentary' && (
                                                <div className={'s-item '} onClick={() => {setActivity('Sedentary'); setOpen(null)}}>
                                                    Sedentary (little or no exercise)
                                                </div>
                                            )}
                                            { activity !== 'Light exercise' && (
                                                <div className={'s-item '} onClick={() => {setActivity('Light exercise'); setOpen(null)}}>
                                                    Light exercise (1-2 days per week)
                                                </div>
                                            )}
                                            { activity !== 'Moderate exercise' && (
                                                <div className={'s-item '} onClick={() => {setActivity('Moderate exercise'); setOpen(null)}}>
                                                    Moderate exercise (3-5 days per week)
                                                </div>
                                            )}
                                            { activity !== 'Heavy exercise' && (
                                                <div className={'s-item '} onClick={() => {setActivity('Heavy exercise'); setOpen(null)}}>
                                                    Heavy exercise (6-7 days per week)
                                                </div>
                                            )}
                                            { activity !== 'Athlete' && (
                                                <div className={'s-item '} onClick={() => {setActivity('Athlete'); setOpen(null)}}>
                                                    Athlete (2x per day)
                                                </div>
                                            )}
                                        </div>
    
                                    </div>
                                    {/* <input className='input' /> */}
                            </div>
    
                            <div className='option-cont'>
                                <h1 className='header'>Age</h1>
                                <input type='number' value={ age } className='input single' onChange={(e) => handleChange(e, 'age')} />
                            </div>
    
                            <div className='option-cont'>
                                <h1 className='header'>Height</h1>
                                <div className='multi-input'>
                                    <input type='number' value={ height[0] } className='input' onChange={(e) => handleChange(e, 'height')} />
                                    {/* <div className='select'>
                                        <label>cm</label>
                                        <div className='s-arr'>
                                            <img src={ arr_down } />
                                        </div>
                                    </div> */}
                                    <div className={'select ' + (open === 2 ? 'open ' : '')}>
                                        <label>{ height[1] }</label>
                                        <div className='s-arr' onClick={() => setOpen((open !== 2 ? 2 : null))}>
                                            <img src={ arr_down } />
                                        </div>
    
                                        <div className={'s-menu '}>
                                            { height[1] !== 'cm' && (
                                                <div className={'s-item '} onClick={() => changeDouble('height', 'cm')}>
                                                    cm
                                                </div>
                                            )}
                                            { height[1] !== 'in' && (
                                                <div className={'s-item '} onClick={() => changeDouble('height', 'in')}>
                                                    in
                                                </div>
                                            )}
                                        </div>
    
                                    </div>
    
                                    {/* <input className='input' /> */}
                                </div>
                            </div>
    
                            <div className='option-cont'>
                                <h1 className='header'>Body fat %</h1>
                                <label className='oc-desc'>optional</label>
                                <input type='number' value={ bf } className='input single' onChange={(e) => handleChange(e, 'bf')} />
                            </div>
                        </div>
                    ) : (
                        <div id='lp-res'>
    
                            <div id='lpr-one'>
                                <div id='lpro-left'>
                                    <div>
                                        <label>{ Math.round(rmr * helper[activity]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</label>
                                        <label>calories per day</label>
                                    </div>
                                    <div>
                                        <label>{ (Math.round(rmr * helper[activity]) * 7).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</label>
                                        <label>calories per week</label>
                                    </div>
                                </div>
                                <div id='lpro-right'>
                                    <h1 className='res-header'>Different activity levels</h1>
    
                                    <div className='table-row main'>
                                        <label>Basal metabolic level</label>
                                        <label>{ Math.round(rmr).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } <span>calories per day</span></label>
                                    </div>
    
                                    <div className='table-row'>
                                        <label>Sedentary</label>
                                        <label>{ Math.round(rmr * 1.2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } <span>calories per day</span></label>
                                    </div>
                                    <div className='table-row'>
                                        <label>Light exercise</label>
                                        <label>{ Math.round(rmr * 1.375).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } <span>calories per day</span></label>
                                    </div>
                                    <div className='table-row'>
                                        <label>Moderate exercise</label>
                                        <label>{ Math.round(rmr * 1.55).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } <span>calories per day</span></label>
                                    </div>
                                    <div className='table-row'>
                                        <label>Heavy exercise</label>
                                        <label>{ Math.round(rmr * 1.725).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } <span>calories per day</span></label>
                                    </div>
                                    <div className='table-row'>
                                        <label>Athlete</label>
                                        <label>{ Math.round(rmr * 1.9).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } <span>calories per day</span></label>
                                    </div>
                                </div>
                            </div>
    
                            <div id='lpr-two'>
                                <div id='lprt-left'>
                                    <h1 className='res-header'>Ideal weight is <span>{Math.round(Math.min(gj, bj, jd, dr))} - {Math.round(Math.max(gj, bj, jd, dr))}kg</span></h1>
    
                                    <div className='table-row end'>
                                        <label>G.J. Hamwi Formula (1964)</label>
                                        <label>{ Math.round(gj) } kg</label>
                                    </div>
                                    <div className='table-row end'>
                                        <label>B.J. Devine Formula (1974)</label>
                                        <label>{ Math.round(bj) } kg</label>
                                    </div>
                                    <div className='table-row end'>
                                        <label>J.D. Robinson Formula (1983)</label>
                                        <label>{ Math.round(jd) } kg</label>
                                    </div>
                                    <div className='table-row end'>
                                        <label>D.R. Miller Formula (1983)</label>
                                        <label>{ Math.round(dr) } kg</label>
                                    </div>
                                </div>
                                <div id='lprt-right'>
                                    <h1 className='res-header'>BMI Score is <span>{ bmi }</span></h1>
    
                                    <div className={'table-row end ' + (bmi <= 18.5 ? 'main ' : '')}>
                                        <label>18.5 or less</label>
                                        <label>Underweight</label>
                                    </div>
                                    <div className={'table-row end ' + (bmi > 18.5 && bmi <= 24.99 ? 'main ' : '')}>
                                        <label>18.5 - 24.99</label>
                                        <label>Normal Weight</label>
                                    </div>
                                    <div className={'table-row end ' + (bmi > 25 && bmi <= 29.99 ? 'main ' : '')}>
                                        <label>25 - 29.99</label>
                                        <label>Overweight</label>
                                    </div>
                                    <div className={'table-row end ' + (bmi >= 30 ? 'main ' : '')}>
                                        <label>30+</label>
                                        <label>Obese</label>
                                    </div>
                                </div>
                            </div>
    
                            { gender === 0 && (
                                <div id='lpr-three'>
                                    <h1 className='res-header'>Maximum muscular potential</h1>
                                    <p className='res-desc'>
                                    How ripped could you get? According to Martin Berkhan's formula, your maximum muscular potential is <span>{ m5 } kg at 5%</span> body fat. Most people have no desire to be 5% body fat though, so you'd be <span>{ m10 } kg at 10%</span> body fat & <span>{ m15 } kg at 15%</span> body fat. These numbers are good goals to aim for if you are bulking up!
                                    </p>
                                </div>
                            )}
    
    
                            <div id='lpr-four'>
                                <h1 className='res-header'>Macronutrients</h1>
                                <div id='lprf-menu'>
                                    <label className={(macro === 0 ? 'selected ' : '')} onClick={() => setMacro(0)}>Maintanace</label>
                                    <label className={(macro === 1 ? 'selected ' : '')} onClick={() => setMacro(1)}>Cutting</label>
                                    <label className={(macro === 2 ? 'selected ' : '')} onClick={() => setMacro(2)}>Bulking</label>
                                </div>
    
                                { macro === 0 ? (
                                    <p className='res-desc'>These macronutrient values reflect your <span>maintanace</span> calories of <span>{ (rmrU).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } calories per day</span>.</p>
                                ) : macro === 1 ? (
                                    <p className='res-desc'>These macronutrient values reflect your <span>cutting</span> calories of <span>{ (rmrU - 500).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } calories per day</span>, which is a 500 calorie per day deficit from your maintenance of <span>{ (rmrU).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } calories per day</span>.</p>
                                ) : (
                                    <p className='res-desc'>These macronutrient values reflect your <span>bulking</span> calories of <span>{ (rmrU + 500).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } calories per day</span>, which is +500 calories per day from your maintenance of <span>{ (rmrU).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } calories per day</span>.</p>
                                )}
                                
                                
    
                                { macro === 0 ? (
                                    <div id='lprf-card-cont'>
                                        {macroHelper.map((macro, ind) => {
                                            return (
                                                <div className='card'>
                                                    <div className='c-tab'>
                                                        { macro.title }
                                                    </div>
    
                                                    <div className='c-cont top'>
                                                        <label>{ Math.round((rmrU * macro.data[0] / 100) / 4) }g</label>
                                                        <label>protein</label>
                                                    </div>
                                                    <div className='c-cont middle'>
                                                        <label>{ Math.round((rmrU * macro.data[1] / 100) / 9) }g</label>
                                                        <label>fats</label>
                                                    </div>
                                                    <div className='c-cont bottom'>
                                                        <label>{ Math.round((rmrU * macro.data[2] / 100) / 4) }g</label>
                                                        <label>carbs</label>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                ) : macro === 1 ? (
                                    <div id='lprf-card-cont'>
                                        {macroHelper.map((macro, ind) => {
                                            return (
                                                <div className='card'>
                                                    <div className='c-tab'>
                                                        { macro.title }
                                                    </div>
    
                                                    <div className='c-cont top'>
                                                        <label>{ Math.round(((rmrU - 500) * macro.data[0] / 100) / 4) }g</label>
                                                        <label>protein</label>
                                                    </div>
                                                    <div className='c-cont middle'>
                                                        <label>{ Math.round(((rmrU - 500) * macro.data[1] / 100) / 9) }g</label>
                                                        <label>fats</label>
                                                    </div>
                                                    <div className='c-cont bottom'>
                                                        <label>{ Math.round(((rmrU - 500) * macro.data[2] / 100) / 4) }g</label>
                                                        <label>carbs</label>
                                                    </div>
                                                </div>
                                            )
                                        })}
    
                                    </div>
                                ) : (
                                    <div id='lprf-card-cont'>
                                        {macroHelper.map((macro, ind) => {
                                            return (
                                                <div className='card'>
                                                    <div className='c-tab'>
                                                        { macro.title }
                                                    </div>
    
                                                    <div className='c-cont top'>
                                                        <label>{ Math.round(((rmrU + 500) * macro.data[0] / 100) / 4) }g</label>
                                                        <label>protein</label>
                                                    </div>
                                                    <div className='c-cont middle'>
                                                        <label>{ Math.round(((rmrU + 500) * macro.data[1] / 100) / 9) }g</label>
                                                        <label>fats</label>
                                                    </div>
                                                    <div className='c-cont bottom'>
                                                        <label>{ Math.round(((rmrU + 500) * macro.data[2] / 100) / 4) }g</label>
                                                        <label>carbs</label>
                                                    </div>
                                                </div>
                                            )
                                        })}
    
                                    </div>
                                )}
    
                            </div>
    
                        </div>
                    )}
    
                </div>
    
            </div>
        );
    
    }
    else if (lang === 'bg') {
    
        return (
            <div id='lp'>
                <img id='bg' src={ bg } />

                { page === 0 ? (
                    <div id='calc-btn' className={(age && weight[0] && height[0] ? 'ready ' : '')} onClick={() => setPage(1)}>
                        Изчисли
                    </div>
                ) : (
                    <div id='calc-btn' className={'ready'} onClick={() => setPage(0)}>
                        Назад
                    </div>
                )}


                <div id='lpnav'>
                    <div id='lpnleft'>
                        <div className='sep'>
                            <div></div>
                        </div>
                        <label>Калкулатор на калории</label>
                    </div>
                    <div id='lpnright'>
                        <div className='flag-btn' onClick={() => handleLangClick('bg')}>
                            <img src={ bg_flag } />
                        </div>
                        <div className='flag-btn' onClick={() => handleLangClick('en')}>
                            <img src={ uk_flag } />
                        </div>
                        <div id='menubtn'>
                            <img src={ menu } />
                        </div>
                    </div>
                </div>

                <div id='lpcontent' className={page === 1 ? 'res ' : ''}>
                
                    {/* <div id='lphead'>
                        <h1>The website that can<br></br><span id='fspan'>connect</span> you with <span id='sspan'>anyone</span></h1>
                    </div> */}
                    { page === 0 ? (
                        <div id='lp-enter'>
                            <div className='option-cont'>
                                <h1 className='header' style={{marginBottom : '15px', marginLeft: '10px'}}>Пол</h1>
                                <div className={'radio-btn ' + (gender === 0 ? 'selected ' : '')} onClick={() => setGender(0)}>
                                    <div className='dot-cont'><div className='dot'><div></div></div></div>
                                    Мъж
                                </div>
                                <div className={'radio-btn ' + (gender === 1 ? 'selected ' : '')} onClick={() => setGender(1)}>
                                    <div className='dot-cont'><div className='dot'><div></div></div></div>
                                    Жена
                                </div>
                            </div>

                            <div className='option-cont'>
                                <h1 className='header'>Тегло</h1>
                                <div className='multi-input'>
                                    <input type='number' value={ weight[0] } className='input' onChange={(e) => handleChange(e, 'weight')} />
                                    <div className={'select ' + (open === 0 ? 'open ' : '')}>
                                        <label>{ weight[1] }</label>
                                        <div className='s-arr' onClick={() => setOpen((open !== 0 ? 0 : null))}>
                                            <img src={ arr_down } />
                                        </div>

                                        <div className={'s-menu '}>
                                            { weight[1] !== 'kg' && (
                                                <div className={'s-item '} onClick={() => changeDouble('weight', 'kg')}>
                                                    kg
                                                </div>
                                            )}
                                            { weight[1] !== 'lbs' && (
                                                <div className={'s-item ' + (weight[1] === 'lbs' ? 'hidden ' : '')} onClick={() => changeDouble('weight', 'lbs')}>
                                                    lbs
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                    {/* <input className='input' /> */}
                                </div>
                            </div>

                            <div className='option-cont'>
                                <h1 className='header'>Активност</h1>
                                    {/* <div className='select main'>
                                        <label>Sedentary</label>
                                        <div className='s-arr'>
                                            <img src={ arr_down } />
                                        </div>
                                    </div> */}
                                    <div className={'select main ' + (open === 1 ? 'open ' : '')}>
                                        <label>{ helperBG[activity] }</label>
                                        <div className='s-arr' onClick={() => setOpen((open !== 1 ? 1 : null))}>
                                            <img src={ arr_down } />
                                        </div>

                                        <div className={'s-menu '}>
                                            { activity !== 'Sedentary' && (
                                                <div className={'s-item '} onClick={() => {setActivity('Sedentary'); setOpen(null)}}>
                                                    Никаквa
                                                </div>
                                            )}
                                            { activity !== 'Light exercise' && (
                                                <div className={'s-item '} onClick={() => {setActivity('Light exercise'); setOpen(null)}}>
                                                    Лека активност (1-2 дена на седмица)
                                                </div>
                                            )}
                                            { activity !== 'Moderate exercise' && (
                                                <div className={'s-item '} onClick={() => {setActivity('Moderate exercise'); setOpen(null)}}>
                                                    Умерена активност (3-5 дена на седмица)
                                                </div>
                                            )}
                                            { activity !== 'Heavy exercise' && (
                                                <div className={'s-item '} onClick={() => {setActivity('Heavy exercise'); setOpen(null)}}>
                                                    Висока активност (6-7 дена на седмица)
                                                </div>
                                            )}
                                            { activity !== 'Athlete' && (
                                                <div className={'s-item '} onClick={() => {setActivity('Athlete'); setOpen(null)}}>
                                                    Спортист (2x на ден)
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                    {/* <input className='input' /> */}
                            </div>

                            <div className='option-cont'>
                                <h1 className='header'>Възраст</h1>
                                <input type='number' value={ age } className='input single' onChange={(e) => handleChange(e, 'age')} />
                            </div>

                            <div className='option-cont'>
                                <h1 className='header'>Височина</h1>
                                <div className='multi-input'>
                                    <input type='number' value={ height[0] } className='input' onChange={(e) => handleChange(e, 'height')} />
                                    {/* <div className='select'>
                                        <label>cm</label>
                                        <div className='s-arr'>
                                            <img src={ arr_down } />
                                        </div>
                                    </div> */}
                                    <div className={'select ' + (open === 2 ? 'open ' : '')}>
                                        <label>{ height[1] }</label>
                                        <div className='s-arr' onClick={() => setOpen((open !== 2 ? 2 : null))}>
                                            <img src={ arr_down } />
                                        </div>

                                        <div className={'s-menu '}>
                                            { height[1] !== 'cm' && (
                                                <div className={'s-item '} onClick={() => changeDouble('height', 'cm')}>
                                                    cm
                                                </div>
                                            )}
                                            { height[1] !== 'in' && (
                                                <div className={'s-item '} onClick={() => changeDouble('height', 'in')}>
                                                    in
                                                </div>
                                            )}
                                        </div>

                                    </div>

                                    {/* <input className='input' /> */}
                                </div>
                            </div>

                            <div className='option-cont'>
                                <h1 className='header'>Телесна мазнина %</h1>
                                <label className='oc-desc'>по избор</label>
                                <input type='number' value={ bf } className='input single' onChange={(e) => handleChange(e, 'bf')} />
                            </div>
                        </div>
                    ) : (
                        <div id='lp-res'>

                            <div id='lpr-one'>
                                <div id='lpro-left'>
                                    <div>
                                        <label>{ Math.round(rmr * helper[activity]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</label>
                                        <label>калории на ден</label>
                                    </div>
                                    <div>
                                        <label>{ (Math.round(rmr * helper[activity]) * 7).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</label>
                                        <label>калории на седмица</label>
                                    </div>
                                </div>
                                <div id='lpro-right'>
                                    <h1 className='res-header'>Различни нива на активност</h1>

                                    <div className='table-row main'>
                                        <label>Базално метаболитно ниво</label>
                                        <label>{ Math.round(rmr).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } <span>калории на ден</span></label>
                                    </div>

                                    <div className='table-row'>
                                        <label>Никаквa</label>
                                        <label>{ Math.round(rmr * 1.2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } <span>калории на ден</span></label>
                                    </div>
                                    <div className='table-row'>
                                        <label>Лека активност</label>
                                        <label>{ Math.round(rmr * 1.375).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } <span>калории на ден</span></label>
                                    </div>
                                    <div className='table-row'>
                                        <label>Умерена активност</label>
                                        <label>{ Math.round(rmr * 1.55).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } <span>калории на ден</span></label>
                                    </div>
                                    <div className='table-row'>
                                        <label>Висока активност</label>
                                        <label>{ Math.round(rmr * 1.725).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } <span>калории на ден</span></label>
                                    </div>
                                    <div className='table-row'>
                                        <label>Спортист</label>
                                        <label>{ Math.round(rmr * 1.9).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } <span>калории на ден</span></label>
                                    </div>
                                </div>
                            </div>

                            <div id='lpr-two'>
                                <div id='lprt-left'>
                                    <h1 className='res-header'>Идеалното тегло е <span>{Math.round(Math.min(gj, bj, jd, dr))} - {Math.round(Math.max(gj, bj, jd, dr))}kg</span></h1>

                                    <div className='table-row end'>
                                        <label>G.J. Hamwi Formula (1964)</label>
                                        <label>{ Math.round(gj) } kg</label>
                                    </div>
                                    <div className='table-row end'>
                                        <label>B.J. Devine Formula (1974)</label>
                                        <label>{ Math.round(bj) } kg</label>
                                    </div>
                                    <div className='table-row end'>
                                        <label>J.D. Robinson Formula (1983)</label>
                                        <label>{ Math.round(jd) } kg</label>
                                    </div>
                                    <div className='table-row end'>
                                        <label>D.R. Miller Formula (1983)</label>
                                        <label>{ Math.round(dr) } kg</label>
                                    </div>
                                </div>
                                <div id='lprt-right'>
                                    <h1 className='res-header'>ИТМ е <span>{ bmi }</span></h1>

                                    <div className={'table-row end ' + (bmi <= 18.5 ? 'main ' : '')}>
                                        <label>18.5 или по-малко</label>
                                        <label>Поднормено тегло</label>
                                    </div>
                                    <div className={'table-row end ' + (bmi > 18.5 && bmi <= 24.99 ? 'main ' : '')}>
                                        <label>18.5 - 24.99</label>
                                        <label>Нормално тегло</label>
                                    </div>
                                    <div className={'table-row end ' + (bmi > 25 && bmi <= 29.99 ? 'main ' : '')}>
                                        <label>25 - 29.99</label>
                                        <label>Наднормено тегло</label>
                                    </div>
                                    <div className={'table-row end ' + (bmi >= 30 ? 'main ' : '')}>
                                        <label>30+</label>
                                        <label>МНОГО ДЕБЕЛ</label>
                                    </div>
                                </div>
                            </div>

                            { gender === 0 && (
                                <div id='lpr-three'>
                                    <h1 className='res-header'>Максимален мускулен потенциал</h1>
                                    <p className='res-desc'>
                                    Колко нацепен можеш да станеш? Според формулата на Мартин Беркхан, максималният ти мускулен потенциал е <span>{ m5 } kg при 5%</span> телеснa мазнинa. Повечето хора обаче нямат желание да са 5% телесна мазнина, затова можеш да бъдеш <span>{ m10 } kg при 10%</span> телесна мазнина & <span>{ m15 } kg при 15%</span> телесна мазнина.
                                    </p>
                                </div>
                            )}


                            <div id='lpr-four'>
                                <h1 className='res-header'>Макронутриенти</h1>
                                <div id='lprf-menu'>
                                    <label className={(macro === 0 ? 'selected ' : '')} onClick={() => setMacro(0)}>Поддържане</label>
                                    <label className={(macro === 1 ? 'selected ' : '')} onClick={() => setMacro(1)}>Сваляне</label>
                                    <label className={(macro === 2 ? 'selected ' : '')} onClick={() => setMacro(2)}>Качване</label>
                                </div>

                                { macro === 0 ? (
                                    <p className='res-desc'>Тези стойности на макронутриентите отразяват твоите калории нужни за <span>поддържане на тегло</span>, които са <span>{ (rmrU).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } калории на ден</span>.</p>
                                ) : macro === 1 ? (
                                    <p className='res-desc'>Тези стойности на макронутриентите отразяват твоите калории нужни за <span>сваляне на тегло</span>, които са <span>{ (rmrU - 500).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } калории на ден</span>, което е дефицит от 500 калории на ден от калориите нужни за поддържане на тегло - <span>{ (rmrU).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } калории на ден</span>.</p>
                                ) : (
                                    <p className='res-desc'>Тези стойности на макронутриентите отразяват твоите калории нужни за <span>качване на тегло</span>, които са <span>{ (rmrU + 500).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } калории на ден</span>, което е 500 калории повече на ден от калориите нужни за поддържане на тегло - <span>{ (rmrU).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } калории на ден</span>.</p>
                                )}
                                
                                

                                { macro === 0 ? (
                                    <div id='lprf-card-cont'>
                                        {macroHelperBG.map((macro, ind) => {
                                            return (
                                                <div className='card'>
                                                    <div className='c-tab'>
                                                        { macro.title }
                                                    </div>

                                                    <div className='c-cont top'>
                                                        <label>{ Math.round((rmrU * macro.data[0] / 100) / 4) }g</label>
                                                        <label>протеин</label>
                                                    </div>
                                                    <div className='c-cont middle'>
                                                        <label>{ Math.round((rmrU * macro.data[1] / 100) / 9) }g</label>
                                                        <label>мазнини</label>
                                                    </div>
                                                    <div className='c-cont bottom'>
                                                        <label>{ Math.round((rmrU * macro.data[2] / 100) / 4) }g</label>
                                                        <label>въглехидрати</label>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                ) : macro === 1 ? (
                                    <div id='lprf-card-cont'>
                                        {macroHelperBG.map((macro, ind) => {
                                            return (
                                                <div className='card'>
                                                    <div className='c-tab'>
                                                        { macro.title }
                                                    </div>

                                                    <div className='c-cont top'>
                                                        <label>{ Math.round(((rmrU - 500) * macro.data[0] / 100) / 4) }g</label>
                                                        <label>протеин</label>
                                                    </div>
                                                    <div className='c-cont middle'>
                                                        <label>{ Math.round(((rmrU - 500) * macro.data[1] / 100) / 9) }g</label>
                                                        <label>мазнини</label>
                                                    </div>
                                                    <div className='c-cont bottom'>
                                                        <label>{ Math.round(((rmrU - 500) * macro.data[2] / 100) / 4) }g</label>
                                                        <label>въглехидрати</label>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                    </div>
                                ) : (
                                    <div id='lprf-card-cont'>
                                        {macroHelperBG.map((macro, ind) => {
                                            return (
                                                <div className='card'>
                                                    <div className='c-tab'>
                                                        { macro.title }
                                                    </div>

                                                    <div className='c-cont top'>
                                                        <label>{ Math.round(((rmrU + 500) * macro.data[0] / 100) / 4) }g</label>
                                                        <label>протеин</label>
                                                    </div>
                                                    <div className='c-cont middle'>
                                                        <label>{ Math.round(((rmrU + 500) * macro.data[1] / 100) / 9) }g</label>
                                                        <label>мазнини</label>
                                                    </div>
                                                    <div className='c-cont bottom'>
                                                        <label>{ Math.round(((rmrU + 500) * macro.data[2] / 100) / 4) }g</label>
                                                        <label>въглехидрати</label>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                    </div>
                                )}


                            </div>

                        </div>
                    )}

                </div>

            </div>
        );
    }
}

export default LandingPage;
