<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TaskService;
use Exception;

class TaskController extends Controller
{
    private $taskService;
		// 依存注入
		public function __construct(TaskService $taskService)
		{
			$this->taskService = $taskService;
		}

        public function create(Request $request)
		{
			try {
				// 例外が発生するかもしれない処理(DB登録に失敗するかもしれない)
				$this->taskService->createNewTask($request);
			} catch (Exception $error) {
				// 例外発生時
                logger('ERROR:'.$error);
				return response()->json(['message' => 'DBの登録に失敗しました'], 400);
                
			}	
			// 成功時
			return response()->json(['message' => 'DBに保存しました!'], 200);
		}
}
