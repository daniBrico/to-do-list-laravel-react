<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class taskController extends Controller
{
    // Lista todas las tareas
    public function index()
    {
        $tasks = Task::select('id', 'task', 'isCompleted')->get();

        $data = [
            'tasks' => $tasks,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    // Crea una tarea
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'task' => 'required',
            'isCompleted' => 'required',
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'erros' => $validator->errors()->first(),
                'status' => 400
            ];

            return response()->json($data, 400);
        }

        $task = Task::create([
            'task' => $request->task,
            'isCompleted' => $request->isCompleted,
        ]);

        if (!$task) {
            $data = [
                'message' => 'Error al crear la tarea',
                'status' => 500
            ];

            return response()->json($data, 500);
        }

        $data = [
            'task' => $task,
            'status' => 201
        ];

        return response()->json($data, 201);
    }

    // Muestra una tarea
    public function show($id)
    {
        $task = Task::findOrFail($id);

        if (!$task) {
            $data = [
                'message' => 'Tarea no encontrada',
                'status' => 404
            ];

            return response()->json($data, 404);
        }


        $data = [
            'task' => $task,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    // Elimina una tarea
    public function destroy($id)
    {
        $task = Task::find($id);

        if (!$task) {
            $data = [
                'message' => 'Tarea no encontrada',
                'status' => 404
            ];

            return response()->json($data, 404);
        }

        $task->delete();

        $data = [
            'message' => 'Tarea eliminada',
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    // Actualiza una tarea
    public function update(Request $request, $id)
    {
        $task = Task::find($id);

        if (!$task) {
            $data = [
                'message' => 'Estudiante no encontrado',
                'status' => 404
            ];

            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'task' => 'required',
            'isCompleted' => 'required',
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'erros' => $validator->errors(),
                'status' => 400
            ];
        }

        $task->task = $request->task;
        $task->isCompleted = $request->isCompleted;

        $task->save();

        $data = [
            'message' => 'Tarea actualizado',
            'task' => $task,
            'status' => 200
        ];

        return response()->json($data, 200);
    }
}
