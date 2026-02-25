<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    // GET ALL (excluding soft deleted)
    public function index()
    {
        return Member::where('isDeleted', false)->get();
    }

    // STORE OR UPDATE (SYNC FRIENDLY)
    public function store(Request $request)
    {
        $data = $request->all();

        $member = Member::updateOrCreate(
            ['id' => $data['id']],
            $data
        );

        return response()->json($member);
    }

    // SOFT DELETE
    public function destroy($id)
    {
        $member = Member::findOrFail($id);
        $member->update([
            'isDeleted' => true,
            'syncStatus' => 'synced'
        ]);

        return response()->json(['message' => 'Member soft deleted']);
    }
}