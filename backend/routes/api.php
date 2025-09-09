<?php

declare(strict_types=1);

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\taskController;

Route::get('/tasks', [taskController::class, 'index']);

Route::get('/tasks/{id}', [taskController::class, 'show']);

Route::post('/task', [taskController::class, 'store']);

Route::put('/tasks/{id}', [taskController::class, 'update']);

Route::delete('/tasks/{id}', [taskController::class, 'destroy']);
