<?php

use App\Http\Controllers\Controller;
use App\Http\Controllers\RepuestController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function(){
    //ここに追加していく
    Route::post('/task', [TaskController::class, 'create']);
    Route::get('/user/task', [TaskController::class, 'read']);
    Route::put('/task/{id}', [TaskController::class, 'update']);
    Route::get('/user/task/{id}', [TaskController::class, 'getId']);
    Route::delete('/user/task/{id}', [TaskController::class, 'delete']);
});
