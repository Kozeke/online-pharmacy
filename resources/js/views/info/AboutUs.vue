<template>
  <div class="about_us" v-if="$route.path == '/aboutUs'">
    <div class="text_part">
      <h2>О нас</h2>
      <p>Мир аптек-это интернет площадка нового поколения которая предоставляет возможность поиска, реализации и покупки лекарственных средств и изделий медицинского назначения в режиме онлайн.</p>
    </div>
    <!-- <div class="middle">
            <div class="animate">
                <img src="https://openclipart.org/image/2400px/svg_to_png/86401/provider-internet.png" alt="">
                <span>1032</span>
                <p>Пользователей</p>
            </div>
            <div class="animate">
                <img src="https://cdn4.iconfinder.com/data/icons/box-3/154/box-round-label-storage-pack-package-512.png" alt="">
                <span>1032</span>
                <p>Товары на сайте</p>
            </div>
            <div class="animate">
                <img src="https://1.bp.blogspot.com/-PoCn7U1yR9w/WWmEUABAFJI/AAAAAAAAAIk/M3NI6NkFgYEJH9yFrpU8C2ZPbr-XEaZJgCLcBGAs/s1600/handshake-icon-19-300x300.png" alt="">
                <span>1032</span>
                <p>Продано товаров</p>
            </div>
    </div>-->
    <div class="text_part">
      <h2>Платформа может помочь</h2>
      <p><h4>Партнерам:</h4></p>
      <ol>
        <li><h7>*Заявить о себе Если вы являетесь аптекой которая на данный момент не имеет возможности предоставления товара онлайн и хочет выйти на уровень конкуренции с другими более крупными представителями аптечного бизнеса.</h7></li>
        
        <li><h7>*привлечь большое количество клиентов</h7></li>
        <li><h7>*иметь возможность реализовать лекарственные средства или изделия мед назначения частным лицам, которые приобрели их ранее, но не использовали каким-либо причинам</h7></li>
      </ol> <p><h4>Пользователям:</h4></p>
      <ol>
        <li><h7>*Предоставить доступ:</h7></li>
        <li>-к огромному выбору лекарственных средств и изделий медицинского назначения</li>
        <li>-Автоматизированному поиску редких и распространённых лекарственных средств по крупным городам Казахстана</li>
        <li>*Приобрести товар по выгодной цене</li>
        <li>*Отслеживать наличие скидок</li>
        <li>*Воспользоваться услугой качественной доставки товаров</li>
      </ol>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang="scss">
@font-face {
  font-family: montserrat;
  src: url(/Applications/XAMPP/xamppfiles/htdocs/darihub.kz/resources/sass/montserrat/Montserrat-Light.otf);
}

.about_us {
  width: 72%;
  -webkit-box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  -moz-box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  border-radius: 3px;
  height: 100%;
  margin-bottom: 50px;
  padding: 18px 32px 0 32px;
}
.middle {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .animate {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 29%;
    margin: 0 2%;
    img {
      height: 64px;
      width: 64px;
      margin: auto;
    }
    span {
      text-align: center;
      color: rgba(22, 127, 146);
      letter-spacing: 3px;
      font-style: bold;
      font-size: 26px;
      height: 32px;
      margin: 0px auto 4px auto;
      font-family: montserrat;
    }
    p {
      text-align: center;
      font-size: 16px;
      font-weight: 550;
      height: 42px;
      font-family: montserrat;
    }
  }
}
.text_part {
  padding: 2.5%;
  font-family: montserrat;
  margin-bottom: 0;
  h2 {
    text-align: center;
    font-size: 22px;
    font-weight: 550;
    font-family: montserrat;
    background-color: rgba(22, 127, 146);
    border-radius: 26px;
    color: #fff;
    padding: 8px 18px;
  }
  p {
    font-size: 16px;
    font-family: montserrat;
    text-align: center;
    margin-top: 10px;
  }
}
@media screen and (max-width: 1024px) {
  .about_us {
    width: 100%;
    margin-bottom: 30px;
    padding: 14px 24px 0 24px;
  }
}
@media screen and (max-width: 667px) {
  .about_us {
    margin-bottom: 20px;
    padding: 8px 16px 0 16px;
  }
  .animate {
    span {
      font-size: 16px;
      height: 24px;
      letter-spacing: 2px;
    }
    p {
      font-size: 12px !important;
      height: 36px;
    }
  }
  .text_part {
    h2 {
      font-size: 16px;
      margin-bottom: 8px;
    }
    p {
      font-size: 12px;
    }
  }
}
@media screen and (max-width: 441px) {
  .animate {
    width: 44% !important;
    margin: 0 3% !important;
  }
  .animate:last-of-type {
    width: 100% !important;
    margin: 0 auto !important;
  }
}
</style>


