export class Suscripcion{
  id: number;
  //tipo_suscripcion = ndb.StructuredProperty(TipoSuscripcion, required=True)
  //usuario_key = ndb.KeyProperty(kind=Usuario, required=True)
  //usuario = ndb.StructuredProperty(Usuario, required=True)
  numeroParticipaciones: number;
  numeroSorteos: number;
  numeroSorteosJugados: number;
  fechaHora: string;
  estado: string;
}
