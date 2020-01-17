<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" type="image/png" href="{{ asset('static/favicon.png') }}">

        <title>Загрузка...</title>
        <link rel="stylesheet" href="{{ asset("/css/app.css") }}"> 
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="client-secret" content="8Won1ArRVsLfmv8KmsKMF7uWURjv4LAhHA6RFgCB">
        {{-- <script src="https://widget.cloudpayments.kz/bundles/cloudpayments"></script> --}}
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    </head>

    <body>
    <div id="app">  
        <headbar  @district-change="OnChangedDistrict" @city-change="OnChangedCity" @search-product="OnSearchedProduct"></headbar>
        <navigate></navigate>
        <div class="main_content">
            <sidebar     @select-subcat="OnSelectedSubcat" @selected-values.passive="OnSelectedValues" ></sidebar>
            <user_sidebar ></user_sidebar>
            {{-- <admin ></admin> --}}
            <transition name="fade" mode="out-in">
                <router-view @single-product="SingleProduct" @delete-wish='DeletingWish'  @cleaned-cart="OchistitCart" @cart-length="UpdateLength" @send-product="TakenProduct" @send-locality="TakenLocality"  @update-wish="UpdateWish"></router-view>
            </transition>

        </div> 
        <footer_page></footer_page>
    </div>

    <script>
        window.Laravel = <?php echo json_encode([
            'csrfToken' => csrf_token(),
        ]); ?>;
    </script>
    <script src="{{ asset("/js/app.js?v.1.711") }}" charset="utf-8"></script>
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/vuejs-paginator/2.0.0/vuejs-paginator.js"></script>
    // <!-- BEGIN JIVOSITE CODE {literal} -->
    //     <script type='text/javascript'>
    //     (function(){ var widget_id = 'mVUi23Bjex';var d=document;var w=window;function l(){
    //     var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
    //     s.src = '//code.jivosite.com/script/widget/'+widget_id
    //         ; var ss = document.getElementsByTagName('script')[0]; ss.parentNode.insertBefore(s, ss);}
    //     if(d.readyState=='complete'){l();}else{if(w.attachEvent){w.attachEvent('onload',l);}
    //     else{w.addEventListener('load',l,false);}}})();
    //     </script>
    //     <!-- {/literal} END JIVOSITE CODE -->
    //     <script src="{{ asset("/js/jquery-2.2.4.min.js") }}"></script>

    //     <!-- Include Multislider -->
    //     <script src="{{ asset("/js/multislider.min.js") }}"></script>

    </body>
</html>

