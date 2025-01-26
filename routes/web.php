<?php

use App\Events\SensorUpdated;
use App\Http\Controllers\Home;
use App\Http\Controllers\Statistic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [Home::class, 'index'])->name('home');

Route::get('/statistic', [Statistic::class, 'index'])->name('statistic');

// api
Route::get('/api/weather', function () {
    $lat = 10.848160;
    $long = 106.772522;
    $apiKey = Config::get('services.weather.key');
    $response = Http::get("https://api.openweathermap.org/data/2.5/weather?lat={$lat}&lon={$long}&units=metric&APPID={$apiKey}&lang=vi");

    return $response->json();
});

Route::get('/api/get-sensor', function () {
    // $data = DB::table('sensors')->select('temperature', 'humidity', 'light_level')->latest('created_at')->first();
    
    $data = Cache::get('sensor_data', [
        'temperature' => null,
        'humidity' => null,
        'light_level' => rand(200, 800)
    ]);


    return $data;
});
