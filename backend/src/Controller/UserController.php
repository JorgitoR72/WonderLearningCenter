<?php

namespace App\Controller;

use App\Entity\Detail;
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
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('api/user')]
class UserController extends AbstractController
{
    #[Route('/search/all', name: 'api_user_listall', methods: ['GET'])]
    public function all(EntityManagerInterface $entityManager): JsonResponse
    {
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        $repository = $entityManager->getRepository(User::class);
        $users = $repository->findAll();

        // Convertir los objetos Users directamente a JSON
        $jsonContent = $serializer->serialize($users, 'json');

        // Crear y devolver una JsonResponse
        return new JsonResponse($jsonContent, 200, ['status' => 'user_listall'], true);
    }

    /* #[Route('/{id}', name: 'app_user_info_byId', methods: ['GET'])]
    public function byId($id, EntityManagerInterface $entityManager)
    {
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        $repository = $entityManager->getRepository(User::class);
        $user = $repository->findOneBy(['id' => $id]);

        // Convertir los objetos Users directamente a JSON
        $jsonContent = $serializer->serialize($user, 'json');

        // Crear y devolver una JsonResponse
        return new JsonResponse($jsonContent, 200, ['status' => 'user_info_byId'], true);
    } */

    #[Route('/search/detail', name: 'app_user_info_details', methods: ['GET'])]
    public function details(Request $request, EntityManagerInterface $entityManager)
    {
        $email = $request->query->get('email');
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        $repository = $entityManager->getRepository(User::class);
        $user = $repository->findOneBy(['email' => $email]);

        // Convertir los objetos Users directamente a JSON
        $jsonContent = $serializer->serialize($user, 'json');

        // Crear y devolver una JsonResponse
        return new JsonResponse($jsonContent, 200, ['status' => 'user_info_byId'], true);
    }

    #[Route('/edit/{id}', name: 'app_user_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, User $user, EntityManagerInterface $entityManager)
    {
    }

    #[Route('/delete/{id}', name: 'api_user_delete', methods: ['DELETE'])]
    public function delete($id, EntityManagerInterface $entityManager)
    {
        $userrepository = $entityManager->getRepository(User::class);
        $user = $userrepository->findOneBy(['id' => $id]);

        $entityManager->remove($user);
        $entityManager->flush();
        return new JsonResponse(['status' => 'user_deleted']);
    }

    #[Route('/new', name: 'api_new_user', methods: 'POST')]
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
        $user->setRoles($request->get('role'));
        $userDetail = new Detail;
        $userDetail->setName($request->get('name'));
        $userDetail->setSurname($request->get('surname'));
        $userDetail->setBirthdate($request->get('birthdate'));
        $user->setDetail($userDetail);

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
