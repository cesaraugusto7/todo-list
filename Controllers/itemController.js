const firestore = require('../config/firebaseconfig');

class ItemController {

    async post(req, res) {
        try {
            const { descricao, id_lista } = req.body;

            if (!descricao) {
                return res.status(400).json({ message: 'Dados inválidos! Favor informar a DESCRIÇÃO do item.' });
            }
            if (!id_lista) {
                return res.status(400).json({ message: 'Dados inválidos! Favor informar a ID da Lista do item.' });
            }

            const item = {
                descricao,
                check: false,
                delete: false,
                id_lista
            }

            await firestore.collection('item').add(item);

            return res.status(201).json({ message: 'Item criado com sucesso!' });
        } catch (error) {
            res.status(500).json(error)
        }


    }
    async get(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: 'Dados inválidos! Favor informar a ID do lista.' });
            }

            const arrayItens = {
                itens: []
            }

            const result = await firestore.collection('item').where('id_lista', "==", id).get();

            result.forEach((doc) => {
                var item = {
                    id: doc.id,
                    descricao: doc.data().descricao,
                    check: doc.data().check,
                    delete: doc.data().delete,
                    id_lista: doc.data().id_lista,
                }
                arrayItens.itens.push(item);
            })


            res.status(200).json(arrayItens);
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
    async put(req, res) {
        try {
            const { descricao, check, id } = req.body;

            if (!id) {
                return res.status(400).json({ message: 'Dados inválidos! Favor informar a ID do item.' });
            }

            if (!descricao && !check) {
                return res.status(400).json({ message: 'Dados inválidos! Favor informar dados a serem atualizados (DESCRICÃO OU CHECK).' });
            }
            const item = {}

            if (descricao) {
                item.descricao = descricao;
            }
            if (check) {
                item.check = check;
            }

            await firestore.collection('item').doc(id).set(item, { merge: true });

            res.status(200).json({ message: 'Dados atualizados com sucesso!' })
        } catch (error) {
            res.status(500).json(error)
        }

    }
    async delete(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Dados inválidos! Favor informar a ID do item.' });
        }

        const item = {
            delete: true,
        }

        await firestore.collection('item').doc(id).set(item, { merge: true });

        res.status(200).json({ message: 'Item deletado com sucesso!' })
    }
}

module.exports = new ItemController();