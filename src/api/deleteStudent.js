export const deleteStudent = async (id) => {
  try {
    console.log(id)
    const response = await fetch(`http://localhost:4000/students/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el estudiante');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};