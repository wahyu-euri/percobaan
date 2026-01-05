<?php

use App\Http\Controllers\admin\PenggunaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Login, Logout, and Get Current User routes
Route::get('/me', [AuthController::class, 'index'])->middleware('auth:sanctum');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// HALAMAN ADMIN

// Dashboard Admin
Route::get('/admin/dashboard', [AuthController::class, 'adminDashboard'])->middleware('auth:sanctum');

// Halaman pengguna
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/pengguna', [PenggunaController::class, 'index']);
    Route::post('/admin/pengguna', [PenggunaController::class, 'store']);
    Route::put('/admin/pengguna/{id}', [PenggunaController::class, 'update']);
    Route::delete('/admin/pengguna/{id}', [PenggunaController::class, 'destroy']);
});

//Halaman Klien
Route::get('/admin/klien', [ClientController::class, 'index']);
Route::post('/admin/klien', [ClientController::class, 'store']);
Route::post('/admin/klien/{client}', [ClientController::class, 'update']);
Route::delete('/admin/klien/{client}', [ClientController::class, 'destroy']);
Route::patch('/admin/klien/{client}/toggle', [ClientController::class, 'toggleStatus']);
