<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Weather/Home');
})->name('home');

Route::get('/statistic', function () {
    return Inertia::render('Weather/Statistic');
})->name('statistic');

Route::get('/weather', function () {
    $lat = 10.848160;
    $long = 106.772522;
    $apiKey = Config::get('services.weather.key');
    $response = Http::get("https://api.openweathermap.org/data/2.5/weather?lat={$lat}&lon={$long}&units=metric&APPID={$apiKey}&lang=vi");

    return $response->json();
});

Route::post('/api/gettemperature', function (Request $request) {
    $temperature = $request->input('temperature');
    $humidity = $request->input('humidity');

    return response()->json(['success' => true, 'temperature' => $temperature, 'humidity' => $humidity]);
});
