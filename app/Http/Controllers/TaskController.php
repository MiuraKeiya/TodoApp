<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TaskService;
use Exception;
use Illuminate\Http\JsonResponse;
// コントローラーはあくまでもレスポンス返すだけにする
class TaskController extends Controller
{
    private $taskService;

		/**
         * DB登録処理メソッドを使えるようにしている
         */
		public function __construct(TaskService $taskService)
		{
			$this->taskService = $taskService;
		}
		
        /**
         * DB登録処理の成功時失敗時の挙動
         * このメソッドを呼ぶことでタスクが登録される
		 * 
		 * @param Request $request
		 * @return JsonResponse
         */
        public function create(Request $request): JsonResponse
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
			return response()->json(['message' => 'DBに保存しました!'], 201);
		}

		/**
		 * タスク取得
		 */
		public function read(): JsonResponse
		{	
			try {
				$task = $this->taskService->readTask();
			} catch (Exception $error) {
				logger('ERROR:'.$error);
				return response()->json(['message' => 'タスク取得に失敗しました'], 400);
			}
			
			return response()->json($task, 200);
		}

		/**
		 * タスク更新
		 */
		public function update(Request $request): JsonResponse
		{
			try {
				$this->taskService->updateTask($request);
			} catch (Exception $error) {
				logger('ERROR:'.$error);
				return response()->json(['message' => 'タスク更新に失敗しました'], 409);
			}

			return response()->json(['message' => 'タスクを更新しました'], 200);
		}
}