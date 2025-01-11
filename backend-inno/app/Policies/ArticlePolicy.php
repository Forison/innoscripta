<?php

namespace App\Policies;

use App\Models\User;

class ArticlePolicy
{
    /**
     * Determine if the given article can be updated by the user.
     *
     * @return bool
     */
    public function update(User $user)
    {
        return $user->isAdmin();
    }

    /**
     * Determine if the given article can be deleted by the user.
     *
     * @return bool
     */
    public function destroy(User $user)
    {
        return $user->isAdmin();
    }
}
