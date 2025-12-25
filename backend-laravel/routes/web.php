<?php

use Illuminate\Support\Facades\Route;

// Main welcome page
Route::get('/', function () {
    return view('welcome');
});
