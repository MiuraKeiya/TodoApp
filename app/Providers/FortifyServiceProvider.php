<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use App\Models\User;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Laravel\Fortify\Contracts\LogoutResponse;
use Laravel\Fortify\Fortify;
use Laravel\Fortify\contracts\LoginResponse;
use Laravel\Fortify\Contracts\RegisterResponse;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // 新規登録のレスポンスをJSONに変更
        $this->app->instance(\Laravel\Fortify\Http\Responses\RegisterResponse::class, new class implements RegisterResponse {
            public function toResponse($request)
            {
                return response()->json([
                    'user' => $request->user()
                ], 201);
            }
        });

        // ログインのレスポンスをJSONに変更
        $this->app->instance(\Laravel\Fortify\Http\Responses\LoginResponse::class, new class implements LoginResponse {
            public function toResponse($request)
            {
                return response()->json([
                    'user' => $request->user()
                ]);
            }
        });

        // ログアウトのレスポンスをJSONに変更
        $this->app->instance(\Laravel\Fortify\Http\Responses\LogoutResponse::class, new class implements LogoutResponse {
            public function toResponse($request)
            {
                return response()->json([], 204);
            }
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Fortify::createUsersUsing(CreateNewUser::class);
        Fortify::authenticateUsing(function (Request $request) {
            $user = User::where('email', $request->email)->first();

            if ($user &&
                Hash::check($request->password, $user->password)) {
                return $user;
            }
        });
    }
}
