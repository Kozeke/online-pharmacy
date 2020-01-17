<?php

use Illuminate\Database\Seeder;
use App\Locality;

class CitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    { 
        $data = ['Шымкент','Алматы','Астана' ];
        foreach($data as $locality){
            Locality::create(array(
                'name'=> $locality
            ));
        }
    }
}
