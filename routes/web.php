<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
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
    $apiKey = env('API_KEY_WEATHER');
    $response = Http::get("https://api.openweathermap.org/data/2.5/weather?lat={$lat}&lon={$long}&units=metric&APPID={$apiKey}&lang=vi");

    return $response->json();
});
