<?php

namespace App\Controller;

use App\Entity\Detail;
use App\Form\DetailType;
use App\Repository\DetailRepository;
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

#[Route('api/detail')]
class DetailController extends AbstractController
{
    #[Route('/search/all', name: 'api_detail_listall', methods: ['GET'])]
    public function all(EntityManagerInterface $entityManager): JsonResponse
    {
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        $repository = $entityManager->getRepository(Detail::class);
        $users = $repository->findAll();

        // Convertir los objetos Users directamente a JSON
        $jsonContent = $serializer->serialize($users, 'json');

        // Crear y devolver una JsonResponse
        return new JsonResponse($jsonContent, 200, ['status' => 'user_listall'], true);
    }

    #[Route('/new', name: 'app_detail_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager)
    {
        $detail = new Detail();
    }

    #[Route('/{id}', name: 'app_detail_show', methods: ['GET'])]
    public function show(Detail $detail)
    {
    }

    #[Route('/{id}/edit', name: 'app_detail_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Detail $detail, EntityManagerInterface $entityManager)
    {
    }

    #[Route('/{id}', name: 'app_detail_delete', methods: ['POST'])]
    public function delete(Request $request, Detail $detail, EntityManagerInterface $entityManager)
    {
    }
}
