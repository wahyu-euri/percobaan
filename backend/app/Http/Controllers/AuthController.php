<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;

class AuthController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user()) {
            return Response::json($request->user());
        }

        return Response::json(['message' => 'Unauthenticated'], 401);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        $user = User::where('email', $request->email)
            ->where('status', 'aktif')
            ->first();


        if (!$user || !Hash::check($request->password, $user->password)) {
            return Response::json(['message' => 'Email atau password salah'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        if ($user->status !== 'aktif') {
            return response()->json([
                'message' => 'Akun dinonaktifkan'
            ], 403);
        }


        return Response::json([
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return Response::json(['message' => 'Logout berhasil']);
    }
}
