<template>
    <div class="history_main" v-if="$route.path == '/userHistory'">
        <div class="personal_info">
            <div class="detail_header">
                <h2 v-if="!show_detail">История заказов</h2>
                <h2 v-else>Заказ номер №{{selected_product.order_id}}</h2>
                <a class="text_right" v-on:click="do_change=true" v-if="!show_detail">
                    <i class="fas fa-trash-alt"></i>
                    <span>Очистить</span>
                </a>
            </div>
            <div class="detail" v-if="!show_detail">
                <div class="more_info">
                    <a href>Ваши заказы за последние 90 дней. Показать все заказы</a>
                </div>
                <div class="infos">
                    <table class="responstable">
                        <tr>
                            <th>Номер заказа</th>
                            <th>Название продукта</th>
                            <th class="be_hidden_sm">Количество</th>
                            <th class="be_hidden_xs">Общая цена</th>
                            <th class="be_hidden_xs">Состояние заказа</th>
                            <th class="be_hidden_sm">Способ оплаты</th>
                            <th>Дата покупки</th>
                        </tr>               
                        <tr v-for="(product, index) in products">
                            <td v-on:click="test(product);show_detail=!show_detail" class="click_detail">{{product.order_id}}</td>
                            <td>{{product.name}}</td>
                            <td class="be_hidden_sm">{{product.amount}}</td>
                            <td class="be_hidden_xs">{{totalPrice[index]}}</td>
                            <td class="be_hidden_xs">{{order(product.order_condition)}}</td>
                            <td class="be_hidden_sm">{{product.payment_method}}</td>
                            <td>{{product.date}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="detail" v-else>
                <div class="more_info">
                    <a href v-on:click="show_detail=!show_detail"><i class="fas fa-arrow-left"></i><span>История заказов</span></a>
                </div>
                <div class="infos_innner">
                    <table class="inner_table table_left">            
                        <tr>
                            <td>Номер заказа</td>
                            <td>{{selected_product.order_id}}</td>   
                        </tr>
                        <tr>
                            <td>Номер продукта</td>
                            <td>{{selected_product.id}}</td>   
                        </tr>
                        <tr>
                            <td>Название продукта</a></td>
                            <td>{{selected_product.name}}</td>   
                        </tr>
                        <tr>
                            <td>Произволитель</a></td>
                            <td>{{selected_product.source}}</td>   
                        </tr>
                        <tr>
                            <td>Количества</a></td>
                            <td>{{selected_product.amount}}</td>   
                        </tr>
                        <tr>
                            <td>Общая цена</a></td>
                            <td>{{selected_product.amount * selected_product.price}}</td>   
                        </tr>
                    </table>
                    <table class="inner_table table_right">            
                        <tr>
                            <td>Состояние заказа</td>
                            <td>{{order(selected_product.order_condition)}}</td>
                        </tr>
                        <tr>
                            <td>Способ оплаты</td>
                            <td>{{selected_product.payment_method}}</td>
                        </tr>
                        <tr>
                            <td>Дата покупки</td>
                            <td>{{selected_product.date}}</td>
                        </tr>
                        <tr>
                            <td>Продавец</td>
                            <td>{{selected_product.seller}}</td>
                        </tr>
                        <tr>
                            <td>Способ доставки</td>
                            <td>{{selected_product.shipping_method}}</td>
                        </tr>
                        <tr>
                            <td>Адрес доставки</td>
                            <td>{{selected_product.shipping_address}}</td>
                        </tr>
                    </table>
                </div>
                <div class="check">
                    <a href="http://www.africau.edu/images/default/sample.pdf" download="DariHub_payment_check">Распечатать чек</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show_detail: false,
            do_change: false,
            show_change: false,
            selected_product:"",
            products:[
                {
                    order_id: '0000123',
                    id: '2342134',
                    name: 'Texas baly',
                    source: 'ТОО Россия травы',
                    amount: 2,
                    price: 5000,
                    order_condition: true,
                    payment_method: 'AO Kazkom',
                    date: '01/01/2019',
                    seller: 'Ахметов A.',
                    shipping_method: 'Курьерская служба "Быстро"',
                    shipping_address: 'Астана, Кабанбай батыр 53/10'
                },
                {
                    order_id: '0000156',
                    id: '5678765',
                    name: 'Teraflyu',
                    source: 'Северное сияние',
                    amount: 7,
                    price: 700,
                    order_condition: false,
                    payment_method: 'Оплата при доставке',
                    date: '01/01/2019',
                    seller: 'Тогысбаев К.',
                    shipping_method: 'Курьерская служба "Быстро"',
                    shipping_address: 'Астана, Кабанбай батыр 53/10'
                },
                {
                    order_id: '0000156',
                    id: '5678765',
                    name: 'Teraflyu',
                    source: 'Северное сияние',
                    amount: 7,
                    price: 700,
                    order_condition: false,
                    payment_method: 'Оплата при доставке',
                    date: '01/01/2019',
                    seller: 'Тогысбаев К.',
                    shipping_method: 'Курьерская служба "Быстро"',
                    shipping_address: 'Астана, Кабанбай батыр 53/10'
                },
            ]
        }
    },
    computed: {
        totalPrice: function() {
            return this.products.map(function(product) {
                return product.price * product.amount;
            });
        }
    },
    methods: {
        test: function(text){
                console.log(text);
                this.selected_product=text;

        },
        order: function(order) {
            if(order){
                return 'Оплачено';
            } else {
                return 'Отменено';
            }
        }
    }
};
</script>
<style scoped lang="scss">
@font-face {
  font-family: montserrat;
  src: url(/Applications/XAMPP/xamppfiles/htdocs/darihub.kz/resources/sass/montserrat/Montserrat-Light.otf);
}
.history_main {
  width: 72%;
  border: 1px solid rgb(22,127,146,.2);
  border-radius: 3px;
  padding: 10px;
  display: flex;
  flex-direction: column; 
  flex-wrap: nowrap;
}
.detail_header{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 60px;
    padding: 10px;
    h2{
        font-family: montserrat;
        font-size: 20px;
        padding-left: 50px;
        width: 80%;
        line-height: 30px;
    }
    .text_right{
        width: 20%;
        padding-right: 50px;
        cursor: pointer;
        color: #a6a6a6;
        line-height: 30px;
        font-family: montserrat;
    }
    .text_right:hover{
        color: #808080;
    }
}
.more_info{
    a{
        font-size: 14px;
    }
    i{
        margin-right: 5px;
    }
}
.more_info a:hover{
    color: #000;
    text-decoration: none;
}
.detail{
    width: 100%;
    padding: 0px 15px;
}
.infos_innner{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.responstable {
    margin: 1em 0;
    width: 100%;
    overflow: hidden;
    background: #FFF;
    color: #024457;
    border-radius: 10px;
    border: 1px solid #167F92;
}
.inner_table{
    margin: 1em 0;
    width: 48%;
    overflow: hidden;
    background: #FFF;
    color: #024457;
    border-radius: 10px;
    border: 1px solid #167F92;
    td{
        height: 50px;
        padding-left: 5px;
        font-family: montserrat;
    }
}
.table_right{
    margin-left: 4%;
}
.click_detail{
    color: #0059b3;
    cursor: pointer;
}
.click_detail:hover{
    color: #000;
}
.responstablem tr, .inner_table tr {
    border: 1px solid #D9E4E6;
}
.responstable tr:nth-child(odd), .inner_table tr:nth-child(odd) {
    background-color: #EAF3F3;
}
.responstable th {
    display: none;
    border: 1px solid #FFF;
    background-color: #167F92;
    color: #FFF;
    padding: 6px;
}
.responstable th:first-child {
    display: table-cell;
    text-align: center;
}
.responstable th:nth-child(2) {
    display: table-cell;
}
.responstable th:nth-child(2) span {
    display: none;
}
.responstable th:nth-child(2):after {
    content: attr(data-th);
}   
.responstable td{
    display: block;
    word-wrap: break-word;
    max-width: 7em;
    border: 1px solid #D9E4E6;
}
.responstable td:first-child{
    display: table-cell;
    text-align: center;
    border-right: 1px solid #D9E4E6;
}
.responstable th, .responstable td {
    text-align: left;
    margin: 4px 8px;
    display: table-cell;
    font-size: 13px;
    padding: 6px;
}
.check{
    text-align: right; 
    display:block;
    margin: 20px 0px;
    a{
        font-size: 16px;
        margin: 0px 10px;
        padding: 5px 10px;
        background-color: #5d897c;
        border-radius: 3px;
        color: #fff;
        font-family: montserrat;
    }
    a:hover{
        background-color: #486a60;
        color: #e6e6e6;
        text-decoration: none;
    }
}
@media screen and (max-width: 1254px) {
    .detail_header{
        height: 48px;
        h2{
            padding-left: 42px;
            width: 70%;
        }
        .text_right{
            width: 30%;
            padding-right: 42px;
            text-align: right;
        }
    }
}
@media screen and (max-width: 1024px) {
    .history_main {
        width: 100%;
    }
}
@media screen and (max-width: 802px){
    .inner_table{
        td{
            font-size: 12px;
        }
    }
    .check{
        a{
            font-size: 14px;
        }
    }
    .responstable th, .responstable td {
        font-size: 12px;
    }
    .more_info{
        a{
            font-size: 12px;
        }
    }
}
@media screen and (max-width: 667px){
    .inner_table{
        width: 100%;
        td{
            width: 50%;
        }
    }
    .table_right{
        margin-left: 0;
    }
    .check{
        margin: 16px 0px;
        a{
            font-size: 13px;
            margin: 0px 8px;
            padding: 4px 8px;
        }
    }
    .be_hidden_sm{
        display: none !important;
    }
    .detail_header{
        height: 48px;
        h2{
            font-size: 14px;
            width: 60%;
            padding-left: 24px;
        }
        .text_right{
            font-size: 12px;
            width: 40%;
            padding-right: 24px;
        }
    }
}
@media screen and (max-width: 464px){
    .inner_table{
        td{
            font-size: 11px;
        }
    }
    .check{
        margin: 12px 0px;
        a{
            font-size: 12px;
        }
    }
    .be_hidden_xs{
        display: none !important;
    }
    .detail_header{
        height: 48px;
        h2{
            font-size: 13px;
            width: 60%;
            padding-left: 12px;
            line-height: 18px;
            font-weight: 550;
        }
        .text_right{
            font-size: 11px;
            width: 40%;
            padding-right: 12px;
        }
    }
    .responstable th, .responstable td {
        font-size: 11px;
    }
    .more_info{
        a{
            font-size: 11px;
        }
    }
}
</style>
