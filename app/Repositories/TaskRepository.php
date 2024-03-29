<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskRepository {
    /**
     * タスク登録処理
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

    /**
     * 特定のIDのタスク取得
     * ルートパラメータのidから該当のレコード取得
     */
    public function getTaskById($id)
    {
        return Task::find($id);
    }

    /**
     * タスク削除
     * 特定のidのタスク削除
     */
    public function deleteTask(Request $request) 
    {
        $Task = Task::find($request->id);
        $Task->delete();
    }
}