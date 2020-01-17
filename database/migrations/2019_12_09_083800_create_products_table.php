<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable();    
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
             //subcat reference
             $table->integer('subcat_id')->unsigned();
             $table->foreign('subcat_id')->references('id')->on('subcats');
             $table->string('form')->nullable();    
             $table->string('dose')->nullable();  
             $table->integer('count')->default(0);    
             $table->string('volume')->nullable();    
             $table->date('expiration_date')->nullable();
             $table->string('manufacturer')->nullable(); 
             $table->string('substanse')->nullable();    

             $table->text('annotation')->nullable();  
             $table->integer('discount_in_percent')->nullable();
             $table->integer('price_initial')->default(0);  
             $table->integer('price_with_discount')->default(0);
             $table->boolean('shipping');    
             $table->integer('locality_id')->unsigned()->nullable();
             $table->foreign('locality_id')->references('id')->on('localities');
             $table->string('address')->nullable();    
             $table->boolean('free_shipping')->default(false)->nullable();      
             $table->boolean('approved')->default(false);    
             $table->text('extra_field')->nullable();

            //subcat reference
          
           
            //locality reference 
           
                       
            // $table->integer('id_value')->default(0);
            // $table->string('info')->nullable();
            // $table->integer('is_popular')->default(0);   
            // $table->integer('is_present')->default(0);
            // $table->string('issue_form')->nullable();   
           
            // $table->integer('rating')->default(0);  

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
