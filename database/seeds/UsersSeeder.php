<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Role;


class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role_administrator = Role::where('name', 'admin')->first();

        $users=[
            'name' => 'Administrator',
            'email' => 'kuzia87715683058@gmail.com',
            'role_id' => $role_administrator->id,
            'password' => bcrypt('123456'),
            'phone' => '8 (777) 777 77 77',
            ];
                User::create([
                    'name' => $users['name'],
                    'email' => $users['email'],
                    'role_id' => $users['role_id'],
                    'password' => $users['password'],
                    'phone' => $users['phone']
              ]
            );
            
    }
    
}
