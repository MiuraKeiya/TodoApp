<?php

namespace App\Services;

use App\Repositories\TaskRepository;
use Illuminate\Http\Request;

class TaskService {
    private $taskRepository;

    /**
    * DB登録処理メソッドをプロパティに代入
    * TaskRepositoryのDB登録処理のメソッドをTaskServiceクラスで使えるようにしている
    * 
    * @param TaskRepository $taskRepository
    */
    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    /**
    * 上記で使えるようになったDB登録処理メソッドを使用している
    * 
    * @param Request $request
    */
    public function createNewTask(Request $request)
		{
			$this->taskRepository->createNewTask($request);
		}

    /**
     * タスク取得処理を使用している
     */        
    public function readTask() {
        return $this->taskRepository->readTask();
    }

    /**
     * タスク更新処理を使用
     * @param Request $request
     */
    public function updateTask(Request $request) {
        return $this->taskRepository->updateTask($request);
    }

    /**
     * 特定idのタスク取得処理を使用
     * @param $id
     */
    public function getTaskById($id)
    {
        return $this->taskRepository->getTaskById($id);
    }

    /**
     * タスク削除処理使用
     */
    public function deleteTask(Request $request) 
    {
        return $this->taskRepository->deleteTask($request);
    }
}