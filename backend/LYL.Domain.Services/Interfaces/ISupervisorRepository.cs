using System;
using LYL.Domain.Model;

namespace LYL.Domain.Services.Interfaces;

public interface ISupervisorRepository
{
    Task<Supervisor?> GetByIdAsync(Guid supervisorId);
}
