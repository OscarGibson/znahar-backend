import React from 'react'
import { connect } from 'react-redux'
import MainMenuSimple from '../components/MainMenuSimple';
import { mainMenuSimpleState } from '../redusers/initState';
import Breadcrumbp from '../components/Breadcrumbp';


const ForClients = () => {
    return (
        <div className="ForClients">
            <MainMenuSimple { ...mainMenuSimpleState }/>
            <div className="header">
                <div className="content standart-container">
                    <h1 className="title">Оптовим Кліентам</h1>
                    <Breadcrumbp
                        pages={[{
                            name:"Головна",
                            url:"/"
                        },{
                            name:"Оптовим клієнтам",
                            url:null
                        }]}
                    />
                </div>
            </div>

            <div className="body standart-container">
                <h1 className="title">Оптовим Кліентам</h1>
                <div className="divider"></div>
                <div className="text">
                    <p>Як отримати Картку клієнта:
                    Картку клієнта можна придбати в будь-якій аптеці мережі за ціною 5 гривень (знижка та нарахування балів на першу і наступні покупки) або отримати за акційною ціною 1 гривня після одноразової покупки на суму від 100 гривень (знижка і нарахування балів – на наступні покупки). </p>
                    <p>За ціною 10 гривень можна отримати Картку клієнта у комплекті з двома міні-картками (картками-брелками). Усі картки з одного комплекту мають один номер, на який накопичуються «бали довіри». Використати (списати) бали можна тільки за основною Карткою.</p>
                    <p>Як отримати Соціальну картку:
                    Пенсіонери, особи з інвалідністю І та ІІ груп, ветерани війни та учасники бойових дій за умови пред’явлення посвідчення можуть придбати Соціальну картку за ціною 3 гривні (знижка та нарахування балів на першу і наступні покупки) або отримати за акційною ціною 1 гривня після одноразової покупки на суму від 100 гривень (знижка та нарахування балів – на наступні покупки).</p>
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}

export default connect()(ForClients)