<?php

use Illuminate\Database\Seeder;
use App\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = ['admin','user'];
        foreach($data as $role){
            Role::create(array(
                'name'=> $role
            ));
        }
    }
}
