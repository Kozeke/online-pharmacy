<template>
    <div class="body_content" v-if="$route.path == '/checkout'"> 
        <div class="checkout_procedure">
            <div class="procedure_step">
                <div class="step_header">
                    <h2><span>1</span>Контактная информация</h2>
                </div>
                <div class="registered_form">
                    <h2>Уже зарегистрированы? <span>Войти</span></h2>
                    <h3><span>Зарегистрироваться</span> для последующего использования</h3>
                </div>
                <div class="personal_info">
                    <div v-bind:class="{ 'has-error': errors && errors.last_name }" class="form-group row">
                        <label class="col-4 col-form-label">Фамилия</label>
                        <div class="col-8">
                            <input class="form-control" type="text" placeholder="Ахметов">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-4 col-form-label">Имя</label>
                        <div class="col-8">
                            <input class="form-control" type="text" placeholder="Алишер">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-4 col-form-label">Телефон</label>
                        <div class="col-8">
                            <masked-input v-model="phone" class="form-control" mask="1 (111) 111 11 11" placeholder="8 (707) 465 48 12" type="tel"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-4 col-form-label">Email</label>
                        <div class="col-8">
                            <input class="form-control" type="text" placeholder="alisher.akhmetov@gmail.com">
                        </div>
                    </div>
                </div>
            </div>
            <div class="procedure_step">
                <div class="step_header">
                    <h2><span>2</span>Способ доставки</h2>
                </div>
                <div class="shipping_info">
                    <div class="form-group row">
                        <label class="col-4 col-form-label">Области</label>
                        <div class="col-8">
                            <select class="form-control" v-model="selected_region">
                                <option value="" disabled selected hidden>Select your option</option>
                                <option>Akmola</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-4 col-form-label">Город</label>
                        <div class="col-8">
                            <select class="form-control" v-model="selected_district">
                                <option>Astana</option>
                            </select>
                        </div>
                    </div>
                    <div class="shipping_option">
                        <div class="shpping_delivery">
                            <div class="delivery_header"> 
                                <input type="radio" id="test1" name="radio-group" checked>
                                <label for="test1">Курьерская доставка</label>
                            </div>
                            <div class="delivery_body">
                                <h5>Стоимость доставки:</h5>
                                <span>Уточняйте у продавца</span>
                            </div>
                        </div>
                        <div class="shpping_takeout">
                            <div class="delivery_header"> 
                                <input type="radio" id="test2" name="radio-group">
                                <label for="test2">Самовывоз</label>
                            </div>
                            <div class="delivery_body">
                                <h5>По адресу:</h5>
                                <span>г. Караганда, ул. Гоголя 52/3</span>
                                <h5>Телефон:</h5>
                                <span>+7(7171)777777, +7(707)1234567</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="procedure_step last_step">
                <div class="step_header">
                    <h2><span>3</span>Способ оплаты</h2>
                </div>
                <div class="payment_option">
                    <div class="pay_option pay_one">
                        <input type="radio" id="two1" name="radio-group" checked>
                        <label for="two1">Оплата при доставке</label>
                    </div>
                    <div class="pay_option pay_two">
                        <input type="radio" id="two2" name="radio-group">
                        <label for="two2">Оплата через платежной картой Visa, MasterCard</label>
                    </div>
                    <div class="pay_option pay_three">
                        <input type="radio" id="two3" name="radio-group">
                        <label for="two3">Оплата через банков Казахстана</label>
                    </div>
                    <div class="pay_option pay_four">
                        <input type="radio" id="two4" name="radio-group">
                        <label for="two4">Оплата через QIWI кошелек</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="checkout_products">
            <div class="product_header">
                <h2><i class="fas fa-bookmark"></i>Ваш Заказ</h2>
            </div>
            <div class="my_products" v-for="product in products">
                <div class="product_name">
                    <span>{{product.name}}</span>
                </div>
                <div class="product_amount">
                    <span>{{product.price}}</span>
                    <span>{{product.amount}}шт.</span>
                </div>
            </div>
            <div class="result_footer">
                <div class="result_cart">
                    <div class="footer_title">
                        <span>Сумма к оплате:</span>
                    </div>
                    <div class="total_price">
                        <span>5000 тг.</span>
                    </div>
                </div>
                <div class="result_submit">
                    <a @click="Oformit()">Перейти к оплате</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { get, post, del } from "../../helpers/api";

import MaskedInput from 'vue-masked-input'
export default {
    components: { 
        'masked-input': MaskedInput,
    },
    data(){
        return {
           products: [
                { name: 'Merries M (6-11 кг) №64 подгузники (467660)', price: '4200', amount: '2'},
                { name: 'Dr. Sea с алоэ вера и дуналиеллой 100 мл маска грязевая минеральная', price: '5200', amount: '1'},
                { name: 'Ромашка №20 Фиточай', price: '1800', amount: '5'},
                { name: 'Сердечно-сосудистый 1,5 г №20 фиточай пак. "Алтайские травы"', price: '2400', amount: '1'},
            ]
        }
    },
    mounted(){ 
        
    },
    methods:{
        Oformit(){
            let _this = this;

      post(
        this,
        "/api/order",
        {
          user_id: _this.$root.user.data.id,
          carts: _this.products,
          totalPrice: _this.totalPrice,
          withDelivery: _this.forPayment
        },
        function(response) {
          console.log(response);
          _this.error = "";
          Swal.fire(
            "Ваша заявка принята",
            "Администратор проверить наличие лекарсва в аптеке и отправит на почту сообщение где вы сможете купить лекарство онлайн",
            "success"
          );
          let bougth = true;
          _this.$emit("cleaned-cart", bougth);
        },
        function(error) {
          _this.formSending = false;
          _this.errors = error.response.data.error;
          console.log(error.response.data.error);
        }
      );
    },
    }
}
</script>
<style scoped lang="scss">
@font-face {
  font-family: montserrat;
  src: url(/Applications/XAMPP/xamppfiles/htdocs/darihub.kz/resources/sass/montserrat/Montserrat-Light.otf);
}
.body_content{
    margin: auto;
    display: flex;
    flex-direction:row;
    flex-wrap: wrap;
    width: 80%;
    -webkit-box-shadow: 1px 2px 23px 0px rgba(22,127,146,0.3);
    -moz-box-shadow: 1px 2px 23px 0px rgba(22,127,146,0.3);
    box-shadow: 1px 2px 23px 0px rgba(22,127,146,0.3);
    padding: 40px;
    margin-bottom: 100px;
}
.checkout_procedure{
    width: 60%;
    display: flex;
    flex-direction:column;
    flex-wrap: wrap;
}
.step_header{
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    flex-direction:row;
    flex-wrap: wrap;
    margin-top: 20px;
    margin-bottom: 10px;
    span{
        background-color: rgb(22,127,146);
        color: #fff;
        padding: 4px 14px;
        border-radius: 50%;
        text-align: center;
        margin: 0px 30px 10px 10px;
        font-family: montserrat;
    }
    h2{
        font-size: 22px;
        font-weight: 500;
        font-family: montserrat;
    }
}
.last_step .step_header{
    margin-top: 0;
}
.registered_form{
    margin:20px 0;
    text-align: center;
    height: 80px;
    background-color: rgb(22,127,146,.3);
    border-radius: 3px;
    padding: 20px;
    h2{
        font-size: 18px;
        font-weight: 400;
        font-family: montserrat;
        span{
            border: 1px solid rgb(22,127,146,.3);
            border-radius: 3px;
            padding: 5px 10px;
            cursor: pointer;
            font-family: montserrat;
        }
        span:hover{
            background-color: rgb(22,127,146,.3);
            color: #fff;
        }
    }
    h3{
        font-size: 16px;
        font-weight: 300;
        height: 50px;
        font-family: montserrat;
        span{
            cursor: pointer;
            color: rgb(22,127,146);
            font-family: montserrat;
        }
        span:hover{
            text-decoration: underline;
        }
    }
}
.col-form-label {
    font-weight: bold;
    margin-bottom: 2px;
    display: block; 
    font-family: montserrat;
}
.form-control {
    outline: none;
    appearance: unset !important;
    -moz-appearance: unset !important;
    -webkit-appearance: unset !important;
    -o-appearance: unset !important;
    -ms-appearance: unset !important; 
}
.form-control:focus {
    outline: none;
    box-shadow: none !important;
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    -o-box-shadow: none !important;
    -ms-box-shadow: none !important; 
}
.form-control {
    display: block;
    width: 100%;
    border: 1px solid #ebebeb;
    padding: 0 20px;
    box-sizing: border-box;
}
.shipping_option{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.shpping_delivery,.shpping_takeout{
    width: 48%;
    text-align: center;
    border: 2px solid rgb(22,127,146,.3);
    border-radius: 3px;
    margin: 0 2%;
    font-size: 1rem;
}
.shpping_delivery{
    margin-left: 0;
}
.shpping_takeout{
    margin-right: 0;
}
.shipping_option,.payment_option {
    label {
        padding: 6px;
        height: 46px;
        width: 100%;
        text-align: left;
        cursor: pointer;
        position: relative;
        transition: color 200ms ease-in;
        overflow: hidden;
        background-color: rgb(22,127,146,.3);
        font-family: montserrat;
        margin-bottom: 0;
        &:after {
            width: 28px;
            height: 28px;
            content: '';
            border: 2px solid rgb(22,127,146,.5);
            background-color: #fff;
            background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");
            background-repeat: no-repeat;
            border-radius: 10%;
            z-index: 2;
            position: absolute;
            right: 5%;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            transition: all 200ms ease-in;
        }
    }
    input:checked ~ label {
         &:before {
            transform: translate(-50%, -50%) scale3d(56, 56, 1);
            opacity: 1;
        }
        &:after {
            background-color: #6CD28F;
            border-color: #6CD28F;
        }
    }
    input{
        width: 32px;
        height: 32px;
        order: 1;
        z-index: 2;
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        visibility: hidden;
    }
} 
.delivery_header{
    height: 46px;
}
.delivery_body{
    display: flex;
    flex-direction: column;
    padding: 8px;
    h5,span{
        font-size: 0.9rem;
        text-align: center;
        font-family: montserrat;
    }
    span{
        font-style: italic;
        margin-top: -5px;
    }
    h5{
        text-align: left;
        font-weight: 600;
    }
}
.payment_option{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .pay_option{
        width: 45%;
        margin: 5%;
        margin-top: 2%;
    }
    .pay_one, .pay_three{
        margin-left: 0;
        margin-bottom: 0;
    }
    .pay_two, .pay_four{
        margin-right: 0;
        margin-bottom:0;
    }   
}
.payment_option {
    label {
        height: 70px;
        border-radius: 3px;
        &:after {
            top: 67%;
        }
    }
}
.checkout_products{
    width: 35%;
    margin-left: 5%;
    border: 1px solid rgb(22,127,146,.3);
    border-radius: 3px; 
    height: 50%;
    .product_header{
        text-align: center;
        padding: 10px;
        color: #2A3132;
        i{
            margin-right: 10px;
            color: #167F92;
        }
        h2{
            font-size: 22px;
            font-weight: 500;
            text-align: center; 
            font-family: montserrat;  
            color: #167F92;     
        }
    }
    .my_products{
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom: 10px;
    }
    .my_products:nth-last-of-type(odd){
        background-color: rgb(22,127,146,.2);
    }
    .product_name{
        width: 80%;
        padding: 5px;
        span{
            font-size: 16px;
            font-family: montserrat;
        }
    }
    .product_amount{
        display:flex;
        flex-direction: column;
        width: 20%;
        padding: 0 5px;
        span:first-of-type{
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 2px;
            font-family: montserrat;
        }
        span:last-of-type{
            font-size: 18px;
            letter-spacing: 2px;
            padding-right: 5px;
            color: #808080;
            font-family: montserrat;
        }
    }
    .result_footer{
        display:flex;
        flex-direction: column;
        flex-wrap: wrap;
        margin-top: 20px;
        .result_cart{
            display:flex;
            flex-direction: row;
            padding: 0 5px;
            border-top: 1px solid rgb(22,127,146,.2);
            border-bottom: 1px solid rgb(22,127,146,.2);
            .footer_title{
                width: 60%;
                span{
                    font-size: 16px;
                    font-weight: 600;
                    font-family: montserrat;
                }
            }
            .total_price{
                width: 40%;
                padding: 0 5px 0 0;
                span{
                    font-size: 18px;
                    font-weight: 600;
                    letter-spacing: 2px;
                    font-family: montserrat;
                }
            }
        }
        .result_submit{
            margin:10px 10px 10px auto;
            background-color: rgb(22,127,146,.7);
            border-radius: 3px;  
            padding: 5px 10px;  
            cursor: pointer;
            a{
                font-size: 18px;
                color: white;
                font-family: montserrat;
            }
        }
        .result_submit:hover{
            background-color: rgb(22,127,146);
        }
    }
    ::placeholder{
        font-size: 16px;
        font-family: monsterrat;
    }
}
@media screen and (max-width: 1450px){
    .body_content{
        width: 90%;
    }
}
@media screen and (max-width: 1224px) {
    .step_header h2{
        font-size: 18px;
    }
    .last_step .step_header{
        margin-top: 30px;
    }
    .registered_form {
        margin:12px 0;
        padding: 12px;
        h2{
            font-size: 14px;
        }
        h3{
            font-size: 14px;
            height: 46px;
        }
    }
    .form-control {
        padding: 0 12px;
    }
    .shipping_option,.payment_option {
        label { 
            font-size: 14px;
        }
    }
    input{
        font-size: 14px;
    }
    .delivery_body{
        display: flex;
        flex-direction: column;
        padding: 8px;
        h5,span{
            font-size: 14px;
        }
        h5{
            font-weight: 500;
        }
    }
    .payment_option{
        .pay_option{
            width: 80%;
            margin: 4px 10%;
        }
    }
    .payment_option {
        label {
            height: 70px;
            border-radius: 3px;
            font-size: 14px;
            &:after {
                top: 67%;
            }
        }
    }
    .checkout_products{
        width: 35%;
        margin-left: 5%;
        height: 50%;
        .product_header{
            padding: 10px;
            i{
                margin-right: 10px;
            }
            h2{
                font-size: 18px;
            }
        }
        .product_name{
            width: 80%;
            padding: 5px;
            span{
                font-size: 14px;
            }
        }
        .product_amount{
            width: 20%;
            padding: 0 5px;
            span:first-of-type{
                font-size: 14px;
                font-weight: 600;
                letter-spacing: 2px;
            }
            span:last-of-type{
                font-size: 14px;
                letter-spacing: 5px;
                padding-right: 5px;
            }
        }
        .result_footer{
            margin-top: 20px;
            .result_cart{
                padding: 0 5px;
                .footer_title{
                    width: 60%;
                    span{
                        font-size: 14px;
                        font-weight: 500;
                    }
                }
                .total_price{
                    width: 40%;
                    padding: 0 5px 0 0;
                    span{
                        font-size: 14px;
                        font-weight: 500;
                        letter-spacing: 2px;
                    }
                }
            }
            .result_submit{
                margin:10px 10px 10px auto;
                padding: 5px 10px;  
                a{
                    font-size: 14px;
                }
            }
        }
    }
    ::placeholder{
        font-size: 14px;
    }
}
@media screen and (max-width: 1024px) {
    .body_content{
        width: 100%;
    }
    .step_header {
        span{
            text-align: center;
            margin: 0px 18px 6px 6px;
        }
        h2{
            font-size: 16px;
        }
    }
    .last_step .step_header{
        margin-top: 30px;
    }
    .registered_form {
        margin:12px 0;
        padding: 12px;
        h2{
            font-size: 14px;
        }
        h3{
            font-size: 14px;
            height: 46px;
        }
    }
    .col-form-label {
        font-size: 14px;
    }
    .form-control {
        padding: 0 12px;
    }
    .shipping_option,.payment_option {
        label { 
            font-size: 14px;
        }
    }
    .shpping_delivery,.shpping_takeout{
        width: 100%;
        margin: 6px 0;
    }
    input{
        font-size: 14px;
    }
    .delivery_body{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 8px;
        h5,span{
            font-size: 14px;
            width: 70%;
            margin: 0;
        }
        h5{
            font-weight: 500;
            width: 30%;
        }
    }
    .payment_option{
        .pay_option{
            width: 100%;
            margin: 4px 0;
        }
    }
    .payment_option {
        label {
            height: 70px;
            border-radius: 3px;
            font-size: 14px;
            &:after {
                top: 67%;
            }
        }
    }
    .checkout_products{
        width: 35%;
        margin-left: 5%;
        height: 50%;
        .product_header{
            padding: 10px;
            i{
                margin-right: 10px;
            }
            h2{
                font-size: 18px;
            }
        }
        .product_name{
            width: 70%;
            padding: 5px;
            span{
                font-size: 14px;
            }
        }
        .product_amount{
            width: 30%;
            padding: 0 5px;
            span:first-of-type{
                font-size: 14px;
                font-weight: 600;
                letter-spacing: 2px;
                padding-right: 5px;
            }
            span:last-of-type{
                font-size: 14px;
                letter-spacing: 5px;
                padding-right: 5px;
            }
        }
        .result_footer{
            margin-top: 20px;
            .result_cart{
                padding: 0 5px;
                .footer_title{
                    width: 60%;
                    span{
                        font-size: 14px;
                        font-weight: 500;
                    }
                }
                .total_price{
                    width: 40%;
                    padding: 0 5px 0 0;
                    span{
                        font-size: 14px;
                        font-weight: 500;
                        letter-spacing: 2px;
                    }
                }
            }
            .result_submit{
                margin:10px 10px 10px auto;
                padding: 5px 10px;  
                a{
                    font-size: 14px;
                }
            }
        }
    }
    ::placeholder{
        font-size: 14px;
    }
}
@media screen and (max-width: 802px) {
    .body_content{
        width: 100%;
    }
    .checkout_procedure{
        width: 100%;
    }
    .step_header {
        span{
            text-align: center;
            margin: 0px 18px 6px 6px;
        }
        h2{
            font-size: 16px;
        }
    }
    .last_step .step_header{
        margin-top: 30px;
    }
    .registered_form {
        margin:12px 0;
        padding: 12px;
        height: 64px;
        h2{
            font-size: 14px;
        }
        h3{
            font-size: 14px;
            height: 46px;
        }
    }
    .form-control {
        padding: 0 12px;
    }
    .shipping_option,.payment_option {
        label { 
            font-size: 14px;
        }
    }
    .shpping_delivery,.shpping_takeout{
        width: 100%;
        margin: 6px 0;
    }
    input{
        font-size: 14px;
    }
    .delivery_body{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 8px;
        h5,span{
            font-size: 14px;
            width: 70%;
            margin: 0;
        }
        h5{
            font-weight: 500;
            width: 30%;
        }
    }
    .payment_option{
        .pay_option{
            width: 100%;
            margin: 4px 0;
        }
    }
    .payment_option {
        label {
            height: 36px;
            border-radius: 3px;
            font-size: 14px;
            &:after {
                top: 50%;
            }
        }
    }
    .checkout_products{
        width: 100%;
        margin-left: 0;
        .product_header{
            padding: 10px;
            i{
                margin-right: 10px;
            }
            h2{
                font-size: 18px;
            }
        }
        .product_name{
            width: 85%;
            padding: 5px;
            span{
                font-size: 14px;
            }
        }
        .product_amount{
            width: 15%;
            padding: 0 5px;
            span:first-of-type{
                font-size: 14px;
                font-weight: 600;
                letter-spacing: 2px;
                padding-right: 5px;
            }
            span:last-of-type{
                font-size: 14px;
                letter-spacing: 2px;
                padding-right: 5px;
            }
        }
        .result_footer{
            margin-top: 20px;
            .result_cart{
                padding: 0 5px;
                .footer_title{
                    width: 80%;
                    span{
                        font-size: 14px;
                        font-weight: 500;
                    }
                }
                .total_price{
                    width: 20%;
                    padding: 0 5px 0 0;
                    span{
                        font-size: 14px;
                        font-weight: 500;
                        letter-spacing: 2px;
                    }
                }
            }
            .result_submit{
                margin:10px 10px 10px auto;
                padding: 5px 10px;  
                a{
                    font-size: 14px;
                }
            }
        }
    }
    ::placeholder{
        font-size: 14px;
    }
}
@media screen and (max-width: 667px) {
    .body_content{
        width: 100%;
        padding: 20px
    }
    .checkout_procedure{
        width: 100%;
    }
    .step_header {
        span{
            padding: 4px 12px;
            text-align: center;
            margin: 0px 18px 6px 6px;
        }
        h2{
            font-size: 14px;
        }
    }
    .last_step .step_header{
        margin-top: 30px;
    }
    .registered_form {
        margin:12px 0;
        padding: 12px;
        height: 72px;
        h2{
            font-size: 12px;
        }
        h3{
            font-size: 12px;
            height: 46px;
        }
    }
    .col-form-label {
        font-size: 12px;
    }
    .form-control {
        display: block;
        width: 100%;
        border: 1px solid #ebebeb;
        padding: 0 12px;
        box-sizing: border-box;
        height: 32px
    }
    .shipping_option,.payment_option {
        label { 
            font-size: 12px;
            font-weight: 550;
        }
    }
    .shpping_delivery,.shpping_takeout{
        width: 100%;
        margin: 6px 0;
    }
    input{
        font-size: 12px;
    }
    .delivery_body{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 8px;
        h5,span{
            font-size: 12px;
            width: 70%;
            margin: 0;
        }
        h5{
            font-weight: 500;
            width: 30%;
        }
    }
    .payment_option{
        .pay_option{
            width: 100%;
            margin: 4px 0;
        }
    }
    .payment_option {
        label {
            height: 36px;
            border-radius: 3px;
            font-size: 12px;
            &:after {
                top: 50%;
            }
        }
    }
    .checkout_products{
        width: 100%;
        margin-left: 0;
        .product_header{
            padding: 10px;
            i{
                margin-right: 10px;
            }
            h2{
                font-size: 14px;
            }
        }
        .product_name{
            width: 80%;
            padding: 5px;
            span{
                font-size: 12px;
            }
        }
        .product_amount{
            width: 20%;
            padding: 0 5px;
            span:first-of-type{
                font-size: 12px;
                font-weight: 600;
                letter-spacing: 2px;
                padding-right: 5px;
            }
            span:last-of-type{
                font-size: 12px;
                letter-spacing: 2px;
                padding-right: 5px;
            }
        }
        .result_footer{
            margin-top: 20px;
            .result_cart{
                padding: 0 5px;
                .footer_title{
                    width: 70%;
                    span{
                        font-size: 12px;
                        font-weight: 500;
                    }
                }
                .total_price{
                    width: 30%;
                    padding: 0 5px 0 0;
                    span{
                        font-size: 12px;
                        font-weight: 500;
                        letter-spacing: 2px;
                    }
                }
            }
            .result_submit{
                margin:10px 10px 10px auto;
                padding: 5px 10px;  
                a{
                    font-size: 12px;
                }
            }
        }
    }
    ::placeholder{
        font-size: 12px;
    }
}
@media screen and (max-width: 432px) {
    .body_content{
        width: 100%;
        padding: 20px
    }
    .checkout_procedure{
        width: 100%;
    }
    .step_header {
        span{
            padding: 4px 8px;
            text-align: center;
            margin: 0px 6px 6px 6px;
        }
        h2{
            font-size: 13px;
        }
    }
    .last_step .step_header{
        margin-top: 30px;
    }
    .registered_form {
        margin:12px 0;
        padding: 12px;
        height: 72px;
        h2{
            font-size: 11px;
        }
        h3{
            font-size: 11px;
            height: 46px;
        }
    }
    .col-form-label {
        font-size: 11px;
    }
    .form-control {
        padding: 0 11px;
    }
    .shipping_option,.payment_option {
        label { 
            font-size: 11px;
            font-weight: 550;
        }
    }
    .shpping_delivery,.shpping_takeout{
        width: 100%;
        margin: 6px 0;
    }
    input{
        font-size: 11px;
    }
    .delivery_body{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 8px;
        h5,span{
            font-size: 11px;
            width: 70%;
            margin: 0;
        }
        h5{
            font-weight: 500;
            width: 30%;
        }
    }
    .payment_option{
        .pay_option{
            width: 100%;
            margin: 4px 0;
        }
    }
    .payment_option {
        label {
            height: 56px;
            border-radius: 3px;
            font-size: 11px;
            &:after {
                top: 67%;
            }
        }
    }
    .checkout_products{
        width: 100%;
        margin-left: 0;
        .product_header{
            padding: 10px;
            i{
                margin-right: 10px;
            }
            h2{
                font-size: 13px;
            }
        }
        .product_name{
            width: 80%;
            padding: 5px;
            span{
                font-size: 11px;
            }
        }
        .product_amount{
            width: 20%;
            padding: 0 5px;
            span:first-of-type{
                font-size: 11px;
                font-weight: 600;
                letter-spacing: 2px;
                padding-right: 5px;
            }
            span:last-of-type{
                font-size: 11px;
                letter-spacing: 2px;
                padding-right: 5px;
            }
        }
        .result_footer{
            margin-top: 20px;
            .result_cart{
                padding: 0 5px;
                .footer_title{
                    width: 70%;
                    span{
                        font-size: 11px;
                        font-weight: 500;
                    }
                }
                .total_price{
                    width: 30%;
                    padding: 0 5px 0 0;
                    span{
                        font-size: 11px;
                        font-weight: 500;
                        letter-spacing: 2px;
                    }
                }
            }
            .result_submit{
                margin:10px 10px 10px auto;
                padding: 5px 10px;  
                a{
                    font-size: 11px;
                }
            }
        }
    }
    ::placeholder{
        font-size: 11px;
    }
}
</style>


