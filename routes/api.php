<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::post('/sensor', function (Request $request) {
    $temperature = $request->input('temperature');
    $humidity = $request->input('humidity');

    $data = $request->only(['temperature', 'humidity']);
    $data['light_level'] = rand(400, 500);

    Cache::put('sensor_data', $data, 60);

    $validatedData = $request->validate([
        'temperature' => 'required|numeric',
        'humidity' => 'required|numeric',
    ]);

    DB::table('sensors')->insert([
        'temperature' => $validatedData['temperature'],
        'humidity' => $validatedData['humidity'],
        'aqi' => rand(40, 83),
        'light_level' => rand(400, 500),
    ]);

    return response()->json(['success' => true, 'temperature' => $temperature, 'humidity' => $humidity]);
});
