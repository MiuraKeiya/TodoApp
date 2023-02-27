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

}

