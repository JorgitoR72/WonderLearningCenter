<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\User;

#[Route('/register', name: 'app_register')]
class SecurityController extends AbstractController
{
    #[Route('/new', name: 'app_new_user', methods: 'POST')]
    public function createUser(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $request = $this->transformJsonBody($request);
        $user = new User();
        $user->setEmail($request->get('email'));
        $user->setPassword(
            $passwordHasher->hashPassword(
                $user,
                $request->get('password')
            )
        );
        $user->setRoles(['ROLE_STUDENT']);

        $em->persist($user);
        $em->flush();

        return new JsonResponse(['status' => 'user_created']);
    }

    protected function transformJsonBody(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return null;
        } else if ($data === null) {
            return $request;
        }

        $request->request->replace($data);
        return $request;
    }
}
