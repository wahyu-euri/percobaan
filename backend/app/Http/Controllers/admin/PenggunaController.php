<?php

namespace App\Http\Controllers\admin;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PenggunaController extends Controller
{
    public function index()
    {
        return response()->json(User::all(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'foto' => 'required|string',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'foto' => $request->foto,
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        return response()->json([
            "message" => "Admin baru berhasil ditambahkan",
            "data" => $user
        ], 201);

    }

    public function update(Request $request, $id)
    {
        $user = User::FindOrFail($id);

        $request->validate([
            'foto' => 'sometimes|string',
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,'.$id,
            'password' => 'sometimes|string|min:6',
        ]);

        $user->update([
            'foto' => $request->foto ?? $user->foto,
            'name' => $request->name ?? $user->name,
            'email' => $request->email ?? $user->email,
            'password' => $request->password ?? $user->password,
        ]);

        return response()->json([
            "message" => "Data pengguna berhasil diperbarui",
            "data" => $user
        ], 200);
    }

    public function destroy($id)
    {
        $user = User::FindOrFail($id);
        $user->delete();

        return response()->json([
            "message" => "Pengguna berhasil dihapus"
        ], 200);
    }
}
