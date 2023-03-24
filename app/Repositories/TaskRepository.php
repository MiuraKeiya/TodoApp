<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskRepository {
    /**
     * DB登録処理
     * user()で認証ユーザーを取得している
     * 
     * @param Request $request
     */
    public function createNewTask(Request $request)
    {
        Task::create([
            'title' => $request->title,
            'body' => $request->body,
            'user_id' => $request->user()->id,
        ]);
    }

    /**
     * 認証ユーザータスク全件取得
     */
    public function readTask() 
    {
        return Task::where('user_id', Auth()->user()->id)->get();
    }

    /**
     * タスク更新処理
     */
    public function updateTask(Request $request) 
    {
        $Task = Task::find($request->id);
        $Task->update([
            'title' => $request->title,
            'body' => $request->body,
        ]);
    }

}