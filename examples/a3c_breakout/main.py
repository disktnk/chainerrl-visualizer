import chainer
import numpy as np
from chainerrl.agents import a3c
from chainerrl import links
from chainerrl import misc
from chainerrl.optimizers import rmsprop_async
from chainerrl import policy
from chainerrl import v_function

import atari_wrappers

from chainerrlui import launch_visualizer


class A3CFF(chainer.ChainList, a3c.A3CModel):

    def __init__(self, n_actions):
        self.head = links.NIPSDQNHead()
        self.pi = policy.FCSoftmaxPolicy(
            self.head.n_output_channels, n_actions)
        self.v = v_function.FCVFunction(self.head.n_output_channels)
        super().__init__(self.head, self.pi, self.v)

    def pi_and_v(self, state):
        out = self.head(state)
        return self.pi(out), self.v(out)


def phi(x):
    # Feature extractor
    return np.asarray(x, dtype=np.float32) / 255


def make_env():
    env = atari_wrappers.wrap_deepmind(
        atari_wrappers.make_atari(env_name),
        episode_life=False,
        clip_rewards=False)
    env.seed(seed)
    return env


seed = 0
env_name = 'BreakoutNoFrameskip-v4'

misc.set_random_seed(seed)

env = make_env()
n_actions = env.action_space.n

model = A3CFF(n_actions)
opt = rmsprop_async.RMSpropAsync(lr=7e-4, eps=1e-1, alpha=0.99)
opt.setup(model)
opt.add_hook(chainer.optimizer.GradientClipping(40))

agent = a3c.A3C(model, opt, t_max=5, gamma=0.99,
                beta=1e-2, phi=phi)

agent.load('results/243858/20180830T182043.661324/80000000_finish')

ACTION_MEANINGS = {
    0: 'NOOP',
    1: 'FIRE',
    2: 'RIGHT',
    3: 'LEFT',
}

launch_visualizer(agent, env, action_meanings=ACTION_MEANINGS)
