<?php

use Illuminate\Database\Seeder;
use App\Category;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    { 
        $data = ['Косметика и средства гигиены', 'Изделия медицинского назначения и медтехника','Мама и малыш','Здоровое и спортивное питание',
        'Против гриппа и простуды', 'Травы, сборы, бальзамы','Витамины и Бады','Лекарственные средства' ];
        foreach($data as $cat){
            Category::create(array(
                'name'=> $cat
            ));
        }
    }
}
