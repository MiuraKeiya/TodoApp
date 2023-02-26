<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskRepository {
    // DBとの通信
    public function createNewTask(Request $request)
    {
        logger('TEST:'.$request->user());
        Task::create([
            'title' => $request->title,
            'body' => $request->body,
            'user_id' => $request->user()->id,
        ]);
    }
}