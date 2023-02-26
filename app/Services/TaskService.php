<?php

namespace App\Services;

use App\Repositories\TaskRepository;
use Illuminate\Http\Request;

class TaskService {
    private $taskRepository;

    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function createNewTask(Request $request)
		{
			$this->taskRepository->createNewTask($request);
		}

}

