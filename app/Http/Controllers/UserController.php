<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function readUser() {

        try{
            $user = $this->userService->user();
        } catch(Exception $error) {
            logger('ERROR:'.$error);
            return response()->json(['message' => 'ユーザー取得に失敗しました'], 400);
        }
        
        return response()->json($user, 200);
    }
}
