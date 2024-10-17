<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Statistic extends Controller
{
    public function index()
    {
        $data = DB::table('sensors')->orderBy('created_at', 'asc')->take(24)->get();

        return inertia('Weather/Statistic', [
            'sensor_data' => $data
        ]);
    }
}
