const firestore = require('../config/firebaseconfig');

class ListaController {
    async post(req, res) {
        try {
            const body = req.body;

            if (body.descricao) {

                const lista = {
                    descricao: body.descricao,
                    delete: false,
                }

                await firestore.collection('lista').add(lista);

                res.status(201).json({ message: 'Lista criada com sucesso!' });

            } else {

                res.status(400).json({ message: 'Dados inválidos! Favor informar a DESCRIÇÃO da lista.' });

            }
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor." })
        }
    }

    async get(req, res) {
        try {
            const retorno = {
                listas: []
            }

            const result = await firestore.collection('lista').get();

            result.forEach((lista) => {
                var aux = {
                    id: lista.id,
                    descricao: lista.data().descricao,
                    delete: lista.data().delete,
                }
                retorno.listas.push(aux);
            })

            res.status(200).json(retorno);
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor." })
        }
    }

    async put(req, res) {
        try {
            const { descricao, id } = req.body;

            if (descricao) {
                if (id) {

                    await firestore.collection('lista').doc(body.id).set({ descricao: body.descricao }, { merge: true });

                    res.status(201).json({ message: 'Lista alterada com sucesso!' });

                } else {
                    res.status(400).json({ message: 'Dados inválidos! Favor informar a ID da lista.' });
                }

            } else {
                res.status(400).json({ message: 'Dados inválidos! Favor informar a DESCRIÇÃO da lista.' });
            }

        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor." })
        }
    }
    async delete(req, res) {
        try {
            const id = req.params.id;

            await firestore.collection('lista').doc(id).set({ delete: true }, { merge: true })

            res.status(201).json({ message: 'Lista deletada com sucesso!' });
        } catch (error) {
            res.status(400).json({ error: JSON.stringify(error) })
        }
    }

}

module.exports = new ListaController();