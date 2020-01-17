<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersNoRegsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders_no_regs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('phone')->unique(); 
            $table->string('address'); 
            $table->integer('locality_id')->unsigned();
            $table->foreign('locality_id')->references('id')->on('localities');
            $table->integer('product_id')->unsigned();
            $table->foreign('product_id')->references('id')->on('products');
            $table->integer('count');
            $table->integer('total_price_with_delivery');
            $table->integer('total_price');
            $table->boolean('approved')->default(false);

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
        Schema::dropIfExists('orders_no_regs');
    }
}
