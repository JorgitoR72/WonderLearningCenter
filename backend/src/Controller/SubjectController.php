<?php

namespace App\Controller;

use App\Entity\Subject;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

#[Route('api/subject')]
class SubjectController extends AbstractController
{
  #[Route('/search/all', name: 'api_subject_listall', methods: ['GET'])]
  public function all(EntityManagerInterface $entityManager): JsonResponse
  {
    $encoders = [new JsonEncoder()];
    $normalizers = [new ObjectNormalizer()];
    $serializer = new Serializer($normalizers, $encoders);
    $repository = $entityManager->getRepository(Subject::class);
    $users = $repository->findAll();

    // Convertir los objetos Users directamente a JSON
    $jsonContent = $serializer->serialize($users, 'json');

    // Crear y devolver una JsonResponse
    return new JsonResponse($jsonContent, 200, ['status' => 'subject_listall'], true);
  }
}
