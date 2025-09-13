<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'task';

    protected $fillable = [
        'text',
        'isCompleted',
    ];

    protected $casts = [
        'isCompleted' => 'boolean',
    ];
};
