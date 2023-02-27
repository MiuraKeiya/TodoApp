<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskRepository {
    /**
     * DB登録処理
     * user()で認証ユーザーを取得している
     */
    public function createNewTask(Request $request)
    {
        Task::create([
            'title' => $request->title,
            'body' => $request->body,
            'user_id' => $request->user()->id,
        ]);
    }
}