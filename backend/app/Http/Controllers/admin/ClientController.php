<?php
namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ClientController extends Controller
{
    public function index()
    {
        return Client::latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama_klien' => 'required|string',
            'website' => 'nullable|string',
            'foto' => 'nullable|image|max:2048',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('foto')) {
            $data['foto'] = $request->file('foto')->store('clients', 'public');
        }

        return Client::create($data);
    }

    public function update(Request $request, Client $client)
    {
        $data = $request->validate([
            'nama_klien' => 'required|string',
            'website' => 'nullable|string',
            'foto' => 'nullable|image|max:2048',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('foto')) {
            if ($client->foto) {
                Storage::disk('public')->delete($client->foto);
            }
            $data['foto'] = $request->file('foto')->store('clients', 'public');
        }

        $client->update($data);
        return $client;
    }

    public function destroy(Client $client)
    {
        if ($client->foto) {
            Storage::disk('public')->delete($client->foto);
        }

        $client->delete();
        return response()->noContent();
    }

    public function toggleStatus(Client $client)
    {
        $client->update([
            'is_active' => !$client->is_active
        ]);

        return $client;
    }
}
