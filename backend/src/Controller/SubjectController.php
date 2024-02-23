<?php

namespace App\Controller;

use App\Entity\File;
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

  #[Route('/new/file/{id}', name: 'api_subject_add_file', methods: ['POST'])]
  public function addFileToSubject($id, EntityManagerInterface $em, Request $request): JsonResponse
  {

    $request = $this->transformJsonBody($request);
    $repository = $em->getRepository(Subject::class);
    $subject = $repository->findOneBy(['id' => $id]);
    $file = new File;
    $file->setName($request->get('name'));
    $file->setUrl($request->get('url'));
    $subject->addFile($file);

    $em->persist($subject);
    $em->flush();

    // Devolver una JsonResponse
    return new JsonResponse(['status' => 'subject_file_created']);
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
