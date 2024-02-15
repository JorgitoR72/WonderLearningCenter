<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

#[Route('user')]
class UserController extends AbstractController
{
    #[Route('/listall', name: 'api_user_listall', methods: ['GET'])]
    public function list(EntityManagerInterface $entityManager): JsonResponse
    {
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        $repository = $entityManager->getRepository(User::class);
        $users = $repository->findAll();
        foreach ($users as $user) {
            $user = date('Y-m-d', $user->detail->birthdate->timestamp);
        }

        // Convertir los objetos Users directamente a JSON
        $jsonContent = $serializer->serialize($users, 'json');

        // Crear y devolver una JsonResponse
        return new JsonResponse($jsonContent, 200, ['status' => 'user_listall'], true);
    }

    #[Route('/{id}', name: 'app_user_info', methods: ['GET'])]
    public function show($id, EntityManagerInterface $entityManager)
    {
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        $repository = $entityManager->getRepository(User::class);
        $user = $repository->findOneBy(['id' => $id]);
        /* $detail = $user->getDetail()->getBirthdate(); */

        // Convertir los objetos Users directamente a JSON
        $jsonContent = $serializer->serialize($user, 'json');

        // Crear y devolver una JsonResponse
        return new JsonResponse($jsonContent, 200, ['status' => 'user_info'], true);
    }

    #[Route('/edit/{id}', name: 'app_user_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, User $user, EntityManagerInterface $entityManager)
    {
    }

    #[Route('/delete/{id}', name: 'api_user_delete', methods: ['DELETE'])]
    public function delete($id, EntityManagerInterface $entityManager)
    {
        $repository = $entityManager->getRepository(User::class);
        $user = $repository->findOneBy(['id' => $id]);

        $entityManager->remove($user);
        $entityManager->flush();
        return new JsonResponse(['status' => 'user_deleted']);
    }
}
